import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Query, ParseIntPipe,
} from '@nestjs/common';
import { PokemonService } from '../service/pokemon.service';
import { PokemonDto } from '../dto/pokemonDto';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('/paginated')
  findPaginated(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('type') type?: string,
  ) {
    console.log('Page:', page, 'Limit:', limit, 'Search:', search, 'Type:', type);
    return this.pokemonService.findPaginated({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      search,
      type,
    });
  }

  @Get('/abilities')
  getPokemonsByAbilityName(@Query('name') name: string) {
    return this.pokemonService.getPokemonsByAbilityName(name);
  }

  @Post()
  create(@Body() dto: PokemonDto) {
    return this.pokemonService.create(dto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.pokemonService.findOnePokemon(+id); // the + converts to number
  }

  @Patch('/:id')
  update(@Param('id', ParseIntPipe) id: string, @Body() pokemonDto: PokemonDto) {
    return this.pokemonService.update(+id, pokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.pokemonService.remove(+id);
  }

  @Get('/abilities/list')
  getAbilitiesByName(@Query('name') name: string) {
    return this.pokemonService.getAbilitiesByName(name);
  }

}
