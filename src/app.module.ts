import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { AbilityModule } from './ability/ability.module';

@Module({
  imports: [PokemonModule, AbilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
