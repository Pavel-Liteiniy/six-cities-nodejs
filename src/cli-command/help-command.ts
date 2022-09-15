import chalk from 'chalk';

import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            ${chalk.blue('main.js --<command> [--arguments]')}
        Команды:
            ${chalk.blue('--version')}:                   # выводит номер версии
            ${chalk.blue('--help')}:                      # печатает этот текст
            ${chalk.blue('--import <path>')}:             # импортирует данные из TSV
            ${chalk.blue('--generate <n> <path> <url>')} # генерирует произвольное количество тестовых данных

        `);
  }
}
