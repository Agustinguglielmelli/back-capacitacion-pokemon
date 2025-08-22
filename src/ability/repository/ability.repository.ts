import { PrismaService } from 'prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AbilityDto } from '../dto/ability.dto';

@Injectable()
export class AbilityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAbilitiesByName(name: string) {
    return this.prisma.ability.findMany({
      where: {
        name: {
          contains: name.trim(),
          mode: 'insensitive',
        },
      },
    });
  }
}