import chalk from 'chalk';

import { CliCommandInterface } from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';

import {createOffer, getErrorMessage} from '../utils/common.js';
import {getURI} from '../utils/db.js';

import DatabaseService from '../common/database-client/database.service.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';

import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';

import {UserServiceInterface} from '../modules/user/user-service.interface.js';
import UserService from '../modules/user/user.service.js';
import {UserModel} from '../modules/user/user.entity.js';

import {OfferServiceInterface} from '../modules/offer/offer-service.interface.js';
import OfferService from '../modules/offer/offer.service.js';
import {OfferModel} from '../modules/offer/offer.entity.js';
import {Offer} from '../types/offer.type.js';

import {isNil} from '../utils/common.js';

const DEFAULT_DB_USERNAME = process.env.DB_USER ?? 'admin';
const DEFAULT_DB_PASSWORD = process.env.DB_PASSWORD ?? 'test';
const DEFAULT_DB_HOST = process.env.DB_HOST ?? 'localhost';
const DEFAULT_DB_PORT = process.env.DB_PORT ?? '27017';
const DEFAULT_DB_DBNAME = process.env.DB_NAME ?? 'dbname';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveOffer(offer: Offer) {
    const author = await this.userService.findById(offer.author);

    if (isNil(author)) {
      this.logger.warn('Can\'t save offer - author does not exist');
      return;
    }

    await this.offerService.create({
      ...offer,
      author: author.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(
    filename: string,
    username: string = DEFAULT_DB_USERNAME,
    password: string = DEFAULT_DB_PASSWORD,
    host: string = DEFAULT_DB_HOST,
    port: string = DEFAULT_DB_PORT,
    dbname: string = DEFAULT_DB_DBNAME
  ): Promise<void> {
    const uri = getURI(
      username,
      password,
      host,
      Number(port),
      dbname
    );

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(chalk.red(`Can't read the file: ${getErrorMessage(err)}`));
    }
  }
}
