import { AbilityRepository } from './repository/ability.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AbilityDto } from './dto/ability.dto';


@Injectable()
export class AbilityService {
  constructor(private readonly abilityRepository: AbilityRepository) {}

  async getAbilitiesByName(name: string) {
    if (!name) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'No se pasó ningún nombre para buscar',
        error: 'Bad Request',
      });
    }
    return this.abilityRepository.getAbilitiesByName(name);
  }
}