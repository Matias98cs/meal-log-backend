import { Module } from '@nestjs/common';
import { FileLogger } from './logger.service';

@Module({
  providers: [FileLogger],
  exports: [FileLogger],
})
export class LoggerModule {}
