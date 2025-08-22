import { Controller, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PokemonDto } from '../dto/pokemonDto';
import { Pokemon, Prisma } from '@prisma/client';
import { PokemonRepositoryInterface } from './pokemon.repository.interface';

@Controller()
export class PokemonRepository extends PokemonRepositoryInterface {
  constructor(private prisma: PrismaService) {
    super();
  }

  createPokemon(dto: PokemonDto) {
    const data = {
      name: dto.name,
      type: dto.type,
      height: dto.height,
      weight: dto.weight,
      imageUrl: dto.imageUrl,
    };
    return this.prisma.pokemon.create({ data });
  }

  async getPokemonByid (id: number): Promise<Pokemon | null> {
    return this.prisma.pokemon.findUnique({
      where: { id },
    });
  }

  async updatePokemon(id: number, data: PokemonDto) {
    return this.prisma.pokemon.update({
      where: { id },
      data,
    });
  }
  async deletePokemon(id: number): Promise<Pokemon> {
    return this.prisma.pokemon.delete({
      where: { id },
    });
  }

  async findAll(): Promise<Pokemon[]> {
    return this.prisma.pokemon.findMany();
  }

  async findPaginated({ page = 1, limit = 10, search, type }: { page?: number, limit?: number, search?: string, type?: string }) {
    const where: any = {}; // para ir armando el where de la consulta
    if (search) {
      where.name = { contains: search.trim(), mode: 'insensitive' };
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
    console.log('Data:', data, 'Total:', total, 'Page:', page, 'Limit:', limit);
    return { data, total, page, limit };
  }

  async getPokemonsByAbilityName(abilityName: string) {
    return this.prisma.pokemon.findMany({
      where: {
        abilities: {
          some: {
            name: {
              equals: abilityName.trim(),
              mode: 'insensitive',
            },
          },
        },
      },
      include: {
        abilities: true,
      },
    });
  }



}
