import 'reflect-metadata';
import {inject, injectable} from 'inversify';

import {Component} from '../types/component.type.js';

import { LoggerInterface } from '../common/logger/logger.interface';
import { ConfigInterface } from '../common/config/config.interface';
import {DatabaseInterface} from '../common/database-client/database.interface.js';

import {getURI} from '../utils/db.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface
  ) {}

  public async init() {
    this.logger.info('Application initializationâ€¦');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);
  }
}
