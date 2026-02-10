import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Meal } from "./meal.entity";
import { Ingredient } from "../../ingredients/entities/ingredient.entity";
import { MeasurementUnit } from "../enums/measurement-unit.enum";

@Entity('meal_items')
export class MealItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Meal, (meal) => meal.items, { onDelete: 'CASCADE' })
    meal: Meal;

    @ManyToOne(() => Ingredient, { eager: true })
    ingredient: Ingredient;

    @Column({ type: 'float' })
    amount: number;

    @Column({ type: 'varchar', length: 20, enum: MeasurementUnit, default: MeasurementUnit.GRAMOS })
    unit: MeasurementUnit;

    @Column({ type: 'text', nullable: true })
    comment: string;
}