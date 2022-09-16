import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { readdir } from 'node:fs/promises';

import { ModuleLoaderInterface } from './module-loader.interface.js';

export default class ModuleLoader implements ModuleLoaderInterface {
  async loadModulesFromDirectory(url: string, moduleExt = '.js'){
    const modules = [];

    try {
      const filesList = await readdir(url);
      const commandsFileList = filesList.filter((uri) => path.extname(uri) === moduleExt);

      for (const filePath of commandsFileList) {
        const commandModulePath = path.resolve(url, filePath);
        const module = await this.loadModule(commandModulePath);

        if (module) {
          modules.push(module);
        }
      }
    } catch (error) {
      console.error(chalk.red('Error!'), error);
    }

    return modules;
  }

  async loadModule(url: string){
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const module = await import(url);
    return module.default;
  }

  getCurrentModuleDir(url: string){
    return path.dirname(fileURLToPath(url));
  }
}
