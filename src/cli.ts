#!/usr/bin/env node

import 'reflect-metadata';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import * as dotenv from 'dotenv';

import CLIApplication from './app/cli-application.js';
import ModuleLoader from './common/module-loader/module-loader.js';

const parsedOutput = dotenv.config();

if (parsedOutput.error) {
  throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const myLoader = new ModuleLoader();
const myManager = new CLIApplication();

async function runManager() {
  const cliCommands = await myLoader.loadModulesFromDirectory(`${__dirname}/cli-command`);
  myManager.registerCommands(cliCommands.map((CliCommand) => new CliCommand));
  myManager.processCommand(process.argv);
}

runManager();
