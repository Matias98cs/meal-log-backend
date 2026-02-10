import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { SeedModule } from './seed/seed.module';
import { MealsModule } from './meals/meals.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod' ? true : false,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, // set to false in production
    }),

    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
    }),

    AuthModule,

    LoggerModule,

    IngredientsModule,

    SeedModule,

    MealsModule,

    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
