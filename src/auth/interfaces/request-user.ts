import { Request } from 'express';
import { User } from '../entities/auth.entity';

export interface RequestWithUser extends Request {
  user: User;
}
