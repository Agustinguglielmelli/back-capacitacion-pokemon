import { Pokemon } from '@prisma/client';
import { PokemonDto } from '../dto/pokemonDto';

export abstract class PokemonRepositoryInterface {
  abstract createPokemon(dto: PokemonDto): Promise<Pokemon>;

  abstract getPokemonByid(id: number): Promise<Pokemon | null>;

  abstract updatePokemon(id: number, data: PokemonDto): Promise<Pokemon>;

  abstract deletePokemon(id: number): Promise<Pokemon>;

  abstract findAll(): Promise<Pokemon[]>;

  abstract findPaginated(params: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
  }): Promise<{ data: Pokemon[]; total: number; page: number; limit: number }>;

  abstract getPokemonsByAbilityName(abilityName: string): Promise<Pokemon[]>;
}