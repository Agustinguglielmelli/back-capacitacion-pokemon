import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PokemonService } from '../service/pokemon.service';
import { PokemonDto } from '../dto/pokemonDto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() dto: PokemonDto) {
    return this.pokemonService.create(dto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() pokemonDto: PokemonDto) {
    return this.pokemonService.update(+id, pokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}
