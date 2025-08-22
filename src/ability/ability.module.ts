import { Module } from '@nestjs/common';
import { AbilityController } from './ability.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { AbilityRepository } from './repository/ability.repository';
import { AbilityService } from './ability.service';

@Module({
  controllers: [AbilityController],
  providers: [PrismaService, AbilityRepository, AbilityService],
  exports: [AbilityRepository, AbilityService],
})
export class AbilityModule {}