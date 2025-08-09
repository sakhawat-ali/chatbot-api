import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}
  getHello(): string {
    return 'Hello World!';
  }
  async checkDatabaseConnection(): Promise<{
    status: string;
    database: string;
    timestamp: string;
  }> {
    try {
      await this.dataSource.query('SELECT 1');
      return {
        status: 'connected',
        database: this.dataSource.options.database as string,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'disconnected',
        database: 'unknown',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
