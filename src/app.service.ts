import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config/dist';

import configuration from './config/configuration';
import databaseConfig from './config/database.config';

@Injectable()
export class AppService {
  constructor(
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>,
    @Inject('REMOTE_TASKS') private remoteTasks: any[],
  ) {}

  getHello(): string {
    const apiKey = this.config.apiKey;
    const name = this.dbConfig.postgres.database;
    return `
      API key => ${apiKey}.<br/>
      Database name => ${name}.<br/>
      Remote Tasks count => ${this.remoteTasks.length}.
    `;
  }
}
