import { AbilityRepository } from '../repository/ability.repository';
import { Injectable } from '@nestjs/common';
import { AbilityDto } from '../dto/ability.dto';


@Injectable()
export class AbilityService {
  constructor(private readonly abilityRepository: AbilityRepository) {}

  createAbility(abilityDto: AbilityDto) {
    return this.abilityRepository.create(abilityDto);
  }

}