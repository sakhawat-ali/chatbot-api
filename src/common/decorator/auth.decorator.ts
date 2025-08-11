import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiKeyGuard } from '../guard/api-key.guard';

export function Auth() {
  return applyDecorators(
    UseGuards(ApiKeyGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized - Invalid API key' }),
  );
}