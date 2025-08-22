import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { AbilityModule } from './ability/ability.module';

@Module({
  imports: [PokemonModule, AbilityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
