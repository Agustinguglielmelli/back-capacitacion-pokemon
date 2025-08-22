import { Pokemon } from '@prisma/client';
import { PokemonDTO } from '../dto/pokemonDTO';
import { PaginatedPokemonsDTO } from '../dto/paginatedPokemonsDTO';
import { PokemonResponseDTO } from '../dto/pokemonResponseDTO';
import { PaginatedResponseDto } from '../dto/paginatedResponseDTO';

export abstract class PokemonRepositoryInterface {
  abstract createPokemon(dto: PokemonDTO): Promise<PokemonResponseDTO>;

  abstract getPokemonByid(id: string): Promise<PokemonResponseDTO | null>;

  abstract updatePokemon(id: string, data: PokemonDTO): Promise<PokemonResponseDTO>;

  abstract deletePokemon(id: string): Promise<PokemonResponseDTO>;

  abstract findPaginated(params: PaginatedPokemonsDTO): Promise<PaginatedResponseDto>;
}