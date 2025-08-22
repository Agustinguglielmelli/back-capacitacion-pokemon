import { Pokemon } from '@prisma/client';

export class PokemonResponseDTO {
  id: string;
  name: string;
  type: string;
  height: number;
  weight: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(pokemon: Pokemon) {
    this.id = pokemon.id;
    this.name = pokemon.name;
    this.type = pokemon.type;
    this.height = pokemon.height;
    this.weight = pokemon.weight;
    this.imageUrl = pokemon.imageUrl;
    this.createdAt = pokemon.createdAt;
    this.updatedAt = pokemon.updatedAt;
  }
}