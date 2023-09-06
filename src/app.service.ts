import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    @Inject('TASKS') private tasks: any[],
  ) {}

  getHello(): string {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DB_NAME');
    return `Hello World!, API key => ${apiKey}, Database name => ${dbName}`;
  }
}
