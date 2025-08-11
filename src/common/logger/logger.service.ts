import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class CustomLoggerService implements NestLoggerService {
  constructor(private readonly pinoLogger: PinoLogger) {}

  debug(message: string, context?: string) {
    this.pinoLogger.debug({ context }, message);
  }

  log(message: string, context?: string) {
    this.pinoLogger.info({ context }, message);
  }

  warn(message: string, context?: string) {
    this.pinoLogger.warn({ context }, message);
  }

  error(message: string, trace?: string, context?: string) {
    this.pinoLogger.error({ context, trace }, message);
  }

  verbose(message: string, context?: string) {
    this.debug(message, context);
  }

  logAuthFailure(reason: string, request: any) {
    this.warn(`Auth failure: ${reason} from IP: ${request.ip}`, 'AUTH');
  }

  logSuccess(operation: string, context?: string) {
    this.log(`Operation successful: ${operation}`, context);
  }
}
