import 'reflect-metadata';
import { Container } from 'inversify';
import {types} from '@typegoose/typegoose';

import { LoggerInterface } from './common/logger/logger.interface.js';
import LoggerService from './common/logger/logger.service.js';

import { ConfigInterface } from './common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';

import {DatabaseInterface} from './common/database-client/database.interface.js';
import DatabaseService from './common/database-client/database.service.js';

import {UserServiceInterface} from './modules/user/user-service.interface.js';
import UserService from './modules/user/user.service.js';
import {UserEntity, UserModel} from './modules/user/user.entity.js';

import {CategoryServiceInterface} from './modules/category/category-service.interface.js';
import CategoryService from './modules/category/category.service.js';
import {CategoryEntity, CategoryModel} from './modules/category/category.entity.js';

import {OfferServiceInterface} from './modules/offer/offer-service.interface.js';
import OfferService from './modules/offer/offer.service.js';
import {OfferEntity, OfferModel} from './modules/offer/offer.entity.js';


import { Component } from './types/component.type.js';

import Application from './app/applications.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<CategoryServiceInterface>(Component.CategoryServiceInterface).to(CategoryService);
applicationContainer.bind<types.ModelType<CategoryEntity>>(Component.CategoryModel).toConstantValue(CategoryModel);
applicationContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
applicationContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

const application = applicationContainer.get<Application>(Component.Application);

await application.init();
