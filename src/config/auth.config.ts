import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  apiKeys: process.env.API_KEYS?.split(',') || [],
}));