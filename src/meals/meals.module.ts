import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { Meal } from './entities/meal.entity';
import { MealItem } from './entities/meal-item.entity';
import { MealImage } from './entities/meal-image.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meal, MealItem, MealImage]),
    AuthModule,
  ],
  controllers: [MealsController],
  providers: [MealsService],
  exports: [MealsService, TypeOrmModule],
})
export class MealsModule {}
