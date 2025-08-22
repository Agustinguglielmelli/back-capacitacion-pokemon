import { PaginatedPokemonsDTO } from './dto/paginatedPokemonsDTO';
import { PokemonResponseDTO } from './dto/pokemonResponseDTO';
import { PokemonDTO } from './dto/pokemonDTO';
import { PaginatedResponseDto } from './dto/paginatedResponseDTO';

export abstract class PokemonServiceInterface {
  abstract create(dto: PokemonDTO): Promise<PokemonResponseDTO>;

  abstract findOnePokemon(id: string): Promise<PokemonResponseDTO>;

  abstract update(id: string, dto: PokemonDTO): Promise<PokemonResponseDTO>;

  abstract remove(id: string): Promise<PokemonResponseDTO>;

  abstract findPaginated(params: PaginatedPokemonsDTO): Promise<PaginatedResponseDto>;
}