import { Body, Controller, Post } from '@nestjs/common';
import { AbilityService } from '../service/ability.service';
import { AbilityDto } from '../dto/ability.dto';

@Controller('abilities')
export class AbilityController {
  constructor(private readonly abilityService: AbilityService) {}

  @Post()
  createAbility(@Body() abilityDto: AbilityDto) {
    return this.abilityService.createAbility(abilityDto);
  }
}