import { PrismaService } from 'prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AbilityDto } from '../dto/ability.dto';

@Injectable()
export class AbilityRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(abilityDto: AbilityDto) {
    return this.prisma.ability.create({
      data: abilityDto,
    });
  }
}