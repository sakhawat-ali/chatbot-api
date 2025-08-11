import { registerAs } from '@nestjs/config';

export default registerAs('throttle', () => ({
  name: 'default',
  ttl: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '600000'), // 10 minute
  limit: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS ?? '5'),
}));
