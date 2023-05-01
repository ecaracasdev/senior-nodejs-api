import * as dotenv from "dotenv";
import * as path from "path";
import Config from "./config.types";

export default class ConfigManager {
  static currentConfig: any;
  static configFromDB: any;
  static currentEnvironment: any;

  static async loadConfig(): Promise<any> {
    let envFileName = ".env";
    
    dotenv.config({ path: path.join(__dirname, "..", "..", envFileName) });
    this.currentEnvironment = process.env.NODE_ENV;
    if (this.currentEnvironment === "test") {
      envFileName += ".test";
    }
    try {
      const config = require("./" +
        this.currentEnvironment +
        ".config").default;
      const { correct, errorMessage } = this.checkConfig(config);
      if (!correct) {
        throw errorMessage;
      }
      ConfigManager.currentConfig = config;
    } catch (error) {
      console.log("ERROR AL CARGAR LA CONFIGURACION", error);
      throw String(error);
    }
  }

  static getConfiguration(module?: string): any {
    return module ? this.currentConfig[module] : this.currentConfig;
  }

  static checkConfig(config: Config): {
    correct: boolean;
    errorMessage?: string;
  } {
    return {
      correct: true,
    };
  }
}
