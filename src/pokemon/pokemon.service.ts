import { BadRequestException, Injectable } from '@nestjs/common';
import { PokemonDto } from './dto/pokemonDto';
import { PokemonRepository } from './repository/pokemon.repository';
import { PokemonServiceInterface } from './pokemon.service.interface';

@Injectable()
export class PokemonService extends PokemonServiceInterface {
  constructor(private readonly pokemonRepository: PokemonRepository) {
    super();
  }
  create(pokemonDto: PokemonDto) {
    return this.pokemonRepository.createPokemon(pokemonDto);
  }

  findAll() {
    return this.pokemonRepository.findAll();
  }

  async findOnePokemon(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'El ID debe ser un número positivo',
        error: 'Bad Request',
      });
    }
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

  async update(id: number, pokemonDto: PokemonDto) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'El ID debe ser un número positivo',
        error: 'Bad Request',
      });
    }
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

  remove(id: number) {
    return this.pokemonRepository.deletePokemon(id);
  }

  async findPaginated(query: { page?: number, limit?: number, search?: string, type?: string }) {
    console.log('Query:', query);
    return this.pokemonRepository.findPaginated(query);
  }

  async getPokemonsByAbilityName(name: string) {
    if (!name) {
      throw new BadRequestException('El parámetro name es requerido');
    }
    return this.pokemonRepository.getPokemonsByAbilityName(name);
  }

}
