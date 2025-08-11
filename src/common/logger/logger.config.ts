import { Params } from 'nestjs-pino';

export function createLoggerConfig(): Params {
  const isDevelopment = process.env.NODE_ENV !== 'production';

  return {
    pinoHttp: {
      level: process.env.LOG_LEVEL || 'info',

      // Pretty printing for development
      transport: isDevelopment
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              singleLine: true,
              translateTime: 'SYS:standard',
            },
          }
        : undefined,
    },
  };
}
