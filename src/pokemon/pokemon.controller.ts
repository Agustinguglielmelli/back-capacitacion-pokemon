import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Query
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonDTO } from './dto/pokemonDTO';
import { PaginatedPokemonsDTO } from './dto/paginatedPokemonsDTO';
import { PokemonResponseDTO } from './dto/pokemonResponseDTO';
import { PaginatedResponseDto } from './dto/paginatedResponseDTO';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('')
  findPaginated(@Query() paginatedDTO: PaginatedPokemonsDTO,): Promise<PaginatedResponseDto> {
    return this.pokemonService.findPaginated(paginatedDTO);
  }

  @Post()
  create(@Body() dto: PokemonDTO): Promise<PokemonResponseDTO> {
    return this.pokemonService.create(dto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<PokemonResponseDTO> {
    return this.pokemonService.findOnePokemon(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() pokemonDto: PokemonDTO): Promise<PokemonResponseDTO> {
    return this.pokemonService.update(id, pokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PokemonResponseDTO> {
    return this.pokemonService.remove(id);
  }



}
