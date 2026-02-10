import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidRoles } from '../interfaces';
import { Meal } from '../../meals/entities/meal.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @Column({
    type: 'text',
    array: true,
    default: [ValidRoles.user],
  })
  roles: string[];

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
