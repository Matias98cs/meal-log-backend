import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Meal } from "./meal.entity";

@Entity('meal_image')
export class MealImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Meal, (meal) => meal.images, { onDelete: 'CASCADE' })
    meal: Meal;

    @Column()
    url: string;
}