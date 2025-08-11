import authConfig from './auth.config';
import databaseConfig from './database.config';
import throttleConfig from './throttle.config';

export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: databaseConfig(),
  auth: authConfig(),
  rateLimit: throttleConfig(),
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
});
