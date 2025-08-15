import { Module } from '@nestjs/common';
import { PokemonController } from './controller/pokemon.controller';
import { PokemonService } from './service/pokemon.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PokemonRepository } from './repository/pokemon.repository';


@Module({
  controllers: [PokemonController],
  providers: [PokemonService, PokemonRepository, PrismaService],
  exports: [PokemonService, PokemonRepository],
})
export class PokemonModule {}
