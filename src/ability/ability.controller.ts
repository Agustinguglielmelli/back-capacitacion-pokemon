import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AbilityService } from './ability.service';
import { AbilityDto } from './dto/ability.dto';

@Controller('abilities')
export class AbilityController {
  constructor(private readonly abilityService: AbilityService) {}

  @Get('/abilities/list')
  getAbilitiesByName(@Query('name') name: string) {
    return this.abilityService.getAbilitiesByName(name);
  }
}