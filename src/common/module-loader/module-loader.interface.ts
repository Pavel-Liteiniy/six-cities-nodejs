export interface ModuleLoaderInterface {
  loadModulesFromDirectory(url: string, moduleExt?: string): Promise<void[]>;
  loadModule(url: string): Promise<{[key: string]: unknown}>;
  getCurrentModuleDir(url: string): string
}
