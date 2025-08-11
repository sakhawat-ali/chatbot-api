import { Module, Global } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { CustomLoggerService } from './logger.service';
import { createLoggerConfig } from './logger.config';

@Global()
@Module({
  imports: [PinoLoggerModule.forRoot(createLoggerConfig())],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
