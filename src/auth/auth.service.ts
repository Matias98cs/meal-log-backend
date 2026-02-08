import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/auth.entity';
import { FileLogger } from '../logger/logger.service';
import { PostgresError } from '../logger/interfaces/postgres-error';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

    private readonly logger: FileLogger,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      const newUser = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        roles: user.roles,
        token: this.getJwtToken({ id: user.id }),
      };

      return newUser;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        id: true,
        fullName: true,
        roles: true,
      },
    });

    if (!user) {
      this.logger.error('Invalid credentials (email)');
      throw new UnauthorizedException('Invalid credentials (email)');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      this.logger.error('Invalid credentials (password)');
      throw new UnauthorizedException('Invalid credentials (password)');
    }

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private handleDBErrors(error: unknown): never {
    const stack = error instanceof Error ? error.stack : undefined;
    const pgError = error as Partial<PostgresError>;

    if (pgError.code === '23505') {
      throw new BadRequestException(pgError.detail || 'Record already exists');
    }

    if (pgError.code === '23503') {
      throw new BadRequestException(pgError.detail || 'Foreign key violation');
    }
    this.logger.error(pgError.message || 'Unknown DB Error', stack);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
