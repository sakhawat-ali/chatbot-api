import { Request } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Request): Promise<string> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return req.ip || 'unknown';
    }
    const [, token] = authHeader.split(' ');
    if (token) return `api-key:${token}`;
    return req.ip || 'unknown';
  }
}
