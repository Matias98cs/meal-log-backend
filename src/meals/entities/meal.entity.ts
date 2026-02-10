import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../auth/entities/auth.entity";
import { MealImage } from "./meal-image.entity";
import { MealItem } from "./meal-item.entity";
import { MealCategory } from "../enums/meal-category.enum";

@Entity('meal')
export class Meal {
      @PrimaryGeneratedColumn('uuid')
      id: string;

      @ManyToOne(() => User, (user) => user.meals)
      user: User;

      @Column({ type: 'varchar', length: 150})
      title: string;

      @Column({ type: 'text', nullable: true})
      description: string;

      @Column({ type: 'varchar', length: 100, enum: MealCategory, default: MealCategory.DESAYUNO})
      category: MealCategory;

      @OneToMany(() => MealImage, (mealImage) => mealImage.meal, { cascade: true, onDelete: 'CASCADE' })
      images: MealImage[];

      @OneToMany(() => MealItem, (mealItem) => mealItem.meal, { cascade: true })
      items: MealItem[];

      @CreateDateColumn()
      created_at: Date;

      @UpdateDateColumn()
      updated_at: Date;
}
