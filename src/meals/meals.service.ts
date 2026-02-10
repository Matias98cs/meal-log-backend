import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal, MealItem, MealImage } from './entities/index';
import { User } from '../auth/entities/auth.entity';

@Injectable()
export class MealsService {
  private readonly logger = new Logger('MealsService');

  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,

    @InjectRepository(MealItem)
    private readonly mealItemRepository: Repository<MealItem>,

    @InjectRepository(MealImage)
    private readonly mealImageRepository: Repository<MealImage>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createMealDto: CreateMealDto, user: User) {
    try {
      const { items = [], images = [], ...mealDetails } = createMealDto;

      const meal = this.mealRepository.create({
        ...mealDetails,
        items: items.map((item) =>
          this.mealItemRepository.create({
            amount: item.amount,
            unit: item.unit,
            comment: item.comment,
            ingredient: { id: item.ingredientId },
          }),
        ),
        images: images.map((image) =>
          this.mealImageRepository.create({ url: image }),
        ),
        user,
      });

      await this.mealRepository.save(meal);

      return this.formatMealResponse(meal);

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(user: User) {
    const meals = await this.mealRepository.find({
      where: { user: { id: user.id } },
      relations: {
        items: {
          ingredient: true,
        },
        images: true,
      },
    });

    return meals.map(meal => this.formatMealResponse(meal));
  }

  async findOne(id: string, user: User) {
    const meal = await this.mealRepository.findOne({
      where: { id, user: { id: user.id } },
      relations: {
        items: {
          ingredient: true,
        },
        images: true,
      },
    });

    if (!meal) throw new NotFoundException(`Meal with id ${id} not found`);

    return this.formatMealResponse(meal);
  }

  async update(id: string, updateMealDto: UpdateMealDto, user: User) {
    const { items, images, ...toUpdate } = updateMealDto;

    const meal = await this.mealRepository.preload({
      id,
      ...toUpdate,
      user,
    });

    if (!meal) throw new NotFoundException(`Meal with id ${id} not found`);

    // Basic implementation: if items or images are provided, we should ideally handle their update/replacement.
    // For now, if cascade is on, we might need a transaction for items/images replacement.
    // Simplifying: if there are new items/images, we replace them if cascade allows or just update simple fields.
    
    // In many-to-one/one-to-many with cascade, preloading with relations can be tricky for replacement.
    // For simplicity, let's just update the main meal fields for now.
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(MealImage, { meal: { id } });
        meal.images = images.map(img => this.mealImageRepository.create({ url: img }));
      }

      if (items) {
          await queryRunner.manager.delete(MealItem, { meal: { id } });
          meal.items = items.map(item => this.mealItemRepository.create({
              amount: item.amount,
              unit: item.unit,
              comment: item.comment,
              ingredient: { id: item.ingredientId }
          }));
      }

      await queryRunner.manager.save(meal);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne(id, user);

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string, user: User) {
    const meal = await this.mealRepository.findOne({ where: { id, user: { id: user.id } } });
    if (!meal) throw new NotFoundException(`Meal with id ${id} not found`);
    await this.mealRepository.remove(meal);
  }

  private formatMealResponse(meal: Meal) {
    const { images, ...rest } = meal;
    return {
      ...rest,
      images: images ? images.map(img => img.url) : [],
    };
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllMeals() {
    const query = this.mealRepository.createQueryBuilder();
    try {
      await query.delete().where({}).execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
