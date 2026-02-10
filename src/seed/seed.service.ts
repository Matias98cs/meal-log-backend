import { Injectable } from '@nestjs/common';
import { IngredientsService } from '../ingredients/ingredients.service';
import { INGREDIENTS_SEED_DATA } from './data/seed-ingredients';
import { MealsService } from '../meals/meals.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly ingredientsService: IngredientsService,
    private readonly mealsService: MealsService
  ) {}

  async executedSeedIngredients(): Promise<string> {
    await this.mealsService.deleteAllMeals();
    await this.seedIngredients();
    return 'Ingredients seeded successfully';
  }

  private async seedIngredients(): Promise<void> {
    await this.ingredientsService.deleteAllIngredients();

    const ingredients = INGREDIENTS_SEED_DATA.ingredients;
    for (const ingredient of ingredients) {
      await this.ingredientsService.create(ingredient);
    }
  }
}
