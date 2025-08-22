import { Controller } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PokemonDTO } from '../dto/pokemonDTO';
import { Pokemon } from '@prisma/client';
import { PokemonRepositoryInterface } from './pokemon.repository.interface';
import { PaginatedPokemonsDTO } from '../dto/paginatedPokemonsDTO';
import { PokemonResponseDTO } from '../dto/pokemonResponseDTO';
import { PaginatedResponseDto } from '../dto/paginatedResponseDTO';

@Controller()
export class PokemonRepository extends PokemonRepositoryInterface {
  constructor(private prisma: PrismaService) {
    super();
  }

  createPokemon(dto: PokemonDTO): Promise<PokemonResponseDTO> {
    const data = {
      name: dto.name,
      type: dto.type,
      height: dto.height,
      weight: dto.weight,
      imageUrl: dto.imageUrl,
    };
    return this.prisma.pokemon.create({ data });
  }

  async getPokemonByid(id: string): Promise<PokemonResponseDTO | null> {
    return this.prisma.pokemon.findUnique({
      where: { id },
    });
  }

  async updatePokemon(id: string, data: PokemonDTO): Promise<PokemonResponseDTO> {
    return this.prisma.pokemon.update({
      where: { id },
      data,
    });
  }
  async deletePokemon(id: string): Promise<PokemonResponseDTO> {
    return this.prisma.pokemon.delete({
      where: { id },
    });
  }

  async findPaginated({ page = 1, limit = 10, search, type }: PaginatedPokemonsDTO): Promise<PaginatedResponseDto> {
    const where: any = {}; // para ir armando el where de la consulta
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }
    if (type) {
      where.type = { contains: type, mode: 'insensitive' };
    }
    const [data, total] = await Promise.all([
      this.prisma.pokemon.findMany({
        where,
        skip: (page - 1) * limit, // para saltar registros
        take: limit,
      }),
      this.prisma.pokemon.count({ where }),
    ]);
    const pokemonDTOS = data.map(
      (pokemon) => new PokemonResponseDTO(pokemon));

    return new PaginatedResponseDto(pokemonDTOS, total, page, limit);
  }
}
