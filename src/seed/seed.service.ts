import { Injectable } from '@nestjs/common';
import { IngredientsService } from '../ingredients/ingredients.service';
import { INGREDIENTS_SEED_DATA } from './data/seed-ingredients';

@Injectable()
export class SeedService {
  constructor(private readonly ingredientsService: IngredientsService) {}

  async executedSeedIngredients(): Promise<string> {
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
