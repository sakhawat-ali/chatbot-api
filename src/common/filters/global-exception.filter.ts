import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionHandler');
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        (exceptionResponse as { message?: string })['message']
      ) {
        message =
          (exceptionResponse as { message?: string })['message'] ??
          'Internal server error';
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const errorResponse = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    if (status >= 500) {
      this.logger.error(`Server Error [${status}]: ${message}`, exception);
    } else {
      this.logger.warn(`Client Error [${status}]: ${message}`);
    }

    // Send response
    response.status(status).json(errorResponse);
  }
}
