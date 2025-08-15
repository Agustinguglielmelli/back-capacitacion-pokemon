import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PokemonDto } from '../dto/pokemonDto';
import { Pokemon, Prisma } from '@prisma/client';

@Injectable()
export class PokemonRepository {
  constructor(private prisma: PrismaService) {}

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
}
