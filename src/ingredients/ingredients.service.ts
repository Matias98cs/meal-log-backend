import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
// import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientsService {
  private readonly logger = new Logger('IngredientsService');

  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}
  create(createIngredientDto: CreateIngredientDto) {
    const ingredient = this.ingredientRepository.create(createIngredientDto);
    return this.ingredientRepository.save(ingredient);
  }

  findAll() {
    const ingredients = this.ingredientRepository.find();
    return ingredients;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} ingredient`;
  // }

  // update(id: number, updateIngredientDto: UpdateIngredientDto) {
  //   return `This action updates a #${id} ingredient`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} ingredient`;
  // }

  private handleExeptions(error: any) {
    const errorRes = error as { code: string; detail: string; message: string };

    if (errorRes.code === '23505') {
      throw new BadRequestException(errorRes.detail);
    }
    this.logger.error(errorRes);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllIngredients() {
    const query = this.ingredientRepository.createQueryBuilder('ingredient');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleExeptions(error);
    }
  }
}
