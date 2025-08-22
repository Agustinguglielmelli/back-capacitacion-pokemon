import { PrismaService } from '../../../prisma/prisma.service';
import { PokemonDTO } from '../dto/pokemonDTO';
import { PokemonRepositoryInterface } from './pokemon.repository.interface';
import { PaginatedPokemonsDTO } from '../dto/paginatedPokemonsDTO';
import { PokemonResponseDTO } from '../dto/pokemonResponseDTO';
import { PaginatedResponseDto } from '../dto/paginatedResponseDTO';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonRepository extends PokemonRepositoryInterface {
  constructor(private prisma: PrismaService) {
    super();
  }

  async createPokemon(dto: PokemonDTO): Promise<PokemonResponseDTO> {
    const data = {
      name: dto.name,
      type: dto.type,
      height: dto.height,
      weight: dto.weight,
      imageUrl: dto.imageUrl,
    };
    const pokemon = await this.prisma.pokemon.create({ data });
    return new PokemonResponseDTO(pokemon);
  }

  async getPokemonByid(id: string): Promise<PokemonResponseDTO | null> {
    const pokemon = await this.prisma.pokemon.findUnique({
      where: { id },
    });
    return pokemon ? new PokemonResponseDTO(pokemon) : null;
  }

  async updatePokemon(id: string, data: PokemonDTO): Promise<PokemonResponseDTO> {
    const pokemon = await this.prisma.pokemon.update({
      where: { id },
      data,
    });
    return new PokemonResponseDTO(pokemon);
  }
  async deletePokemon(id: string): Promise<PokemonResponseDTO> {
    const pokemon = await this.prisma.pokemon.delete({
      where: { id },
    });
    return new PokemonResponseDTO(pokemon);
  }

  async findPaginated({ page = 1, limit = 10, search, type }: PaginatedPokemonsDTO): Promise<PaginatedResponseDto> {
    const pageNum = parseInt(page.toString(), 10) || 1;
    const limitNum = parseInt(limit.toString(), 10) || 10;

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
        skip: (pageNum - 1) * limitNum, // para saltar registros
        take: limitNum, // para limitar registros
      }),
      this.prisma.pokemon.count({ where }),
    ]);
    const pokemonDTOS = data.map(
      (pokemon) => new PokemonResponseDTO(pokemon));

    return new PaginatedResponseDto(pokemonDTOS, total, pageNum, limitNum);
  }
}
