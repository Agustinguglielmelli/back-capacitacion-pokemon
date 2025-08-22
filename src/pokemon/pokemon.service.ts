import { BadRequestException, Injectable } from '@nestjs/common';
import { PokemonDTO } from './dto/pokemonDTO';
import { PokemonRepository } from './repository/pokemon.repository';
import { PokemonServiceInterface } from './pokemon.service.interface';
import { PaginatedPokemonsDTO } from './dto/paginatedPokemonsDTO';
import { PokemonResponseDTO } from './dto/pokemonResponseDTO';
import { PaginatedResponseDto } from './dto/paginatedResponseDTO';

@Injectable()
export class PokemonService extends PokemonServiceInterface {
  constructor(private readonly pokemonRepository: PokemonRepository) {
    super();
  }
  create(pokemonDto: PokemonDTO): Promise<PokemonResponseDTO> {
    return this.pokemonRepository.createPokemon(pokemonDto);
  }

  async findOnePokemon(id: string): Promise<PokemonResponseDTO> {
    const pokemon = await this.pokemonRepository.getPokemonByid(id);

    if (!pokemon) {
      throw new BadRequestException({
        statusCode: 404,
        message: `Pokemon with ID ${id} not found`,
        error: 'Not Found',
      });
    }
    return pokemon;
  }

  async update(id: string, pokemonDto: PokemonDTO): Promise<PokemonResponseDTO> {
    
    const pokemon = await this.pokemonRepository.getPokemonByid(id);
    if (!pokemon) {
      throw new BadRequestException({
        statusCode: 404,
        message: `Pokemon with ID ${id} not found`,
        error: 'Not Found',
      });
    }

    return this.pokemonRepository.updatePokemon(id, pokemonDto);
  }

  remove(id: string): Promise<PokemonResponseDTO> {
    return this.pokemonRepository.deletePokemon(id);
  }

  async findPaginated(query: PaginatedPokemonsDTO): Promise<PaginatedResponseDto> {
    return this.pokemonRepository.findPaginated(query);
  }

}
