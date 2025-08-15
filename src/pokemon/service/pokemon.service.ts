import { Injectable } from '@nestjs/common';
import { PokemonDto } from '../dto/pokemonDto';
import { PokemonRepository } from '../repository/pokemon.repository';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {

  }
  create(pokemonDto: PokemonDto) {
    return this.pokemonRepository.createPokemon(pokemonDto);
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, pokemonDto: PokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
