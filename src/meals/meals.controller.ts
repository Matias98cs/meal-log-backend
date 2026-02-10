import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/auth.entity';

@Controller('meals')
@UseGuards(AuthGuard())
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  create(
    @Body() createMealDto: CreateMealDto,
    @GetUser() user: User
  ) {
    return this.mealsService.create(createMealDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.mealsService.findAll(user);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User
  ) {
    return this.mealsService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateMealDto: UpdateMealDto,
    @GetUser() user: User
  ) {
    return this.mealsService.update(id, updateMealDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User
  ) {
    return this.mealsService.remove(id, user);
  }
}
