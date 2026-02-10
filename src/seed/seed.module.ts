import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { MealsModule } from '../meals/meals.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [IngredientsModule, MealsModule],
})
export class SeedModule {}
