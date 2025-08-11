import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException('Missing Authorization header');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new ForbiddenException('Invalid Authorization header format');
    }

    const validApiKeys = this.configService.get<string[]>('auth.apiKeys') || [];

    if (!validApiKeys.includes(token)) {
      throw new ForbiddenException('Invalid API key');
    }

    return true;
  }
}
