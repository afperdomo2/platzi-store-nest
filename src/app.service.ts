import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config/dist';
import configuration from './config/configuration';

import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
    @Inject('PG') private client: Client,
    @Inject('REMOTE_TASKS') private remoteTasks: any[],
  ) {}

  getHello(): string {
    const apiKey = this.config.apiKey;
    const name = this.config.database.name;
    return `
      API key => ${apiKey}.<br/>
      Database name => ${name}.<br/>
      Remote Tasks count => ${this.remoteTasks.length}.
    `;
  }

  async getTasks(): Promise<any> {
    const res = await this.client.query('SELECT * FROM tasks');
    return res.rows;
  }
}
