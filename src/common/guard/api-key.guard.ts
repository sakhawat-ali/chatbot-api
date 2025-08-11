import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  private readonly logger = new Logger(ApiKeyGuard.name);
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException('Missing Authorization header');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      this.logger.warn('Invalid Authorization header format');
      throw new ForbiddenException('Invalid Authorization header format');
    }

    const validApiKeys = this.configService.get<string[]>('auth.apiKeys') || [];

    if (!validApiKeys.includes(token)) {
      this.logger.warn(
        `Invalid API key attempted: ${token.substring(0, 8)}...`,
      );
      throw new ForbiddenException('Invalid API key');
    }

    this.logger.debug(
      `Valid API key authenticated: ${token.substring(0, 8)}...`,
    );

    return true;
  }
}
