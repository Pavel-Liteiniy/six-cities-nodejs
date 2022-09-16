#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import CLIApplication from './app/cli-application.js';
import ModuleLoader from './common/module-loader/module-loader.js';

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
