import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnv } from './env.interface';
import { EnvConfiguration } from './env.config';
import { EnvVariables } from './env.enum';

@Injectable()
export class EnvService implements IEnv {
  constructor(private envConfig: EnvConfiguration) {}

  getDatabase(config: ConfigService): any {
    const env = this.envConfig;
    return {
      type: config.get(
        EnvVariables.DB_TYPE,
        env.getValue(EnvVariables.DB_TYPE),
      ),
      host: config.get(
        EnvVariables.DB_HOST,
        env.getValue(EnvVariables.DB_HOST),
      ),
      port: config.get(
        EnvVariables.DB_PORT,
        env.getValue(EnvVariables.DB_PORT),
      ),
      username: config.get(
        EnvVariables.DB_USERNAME,
        env.getValue(EnvVariables.DB_USERNAME),
      ),
      password: config.get(
        EnvVariables.DB_PASSWORD,
        env.getValue(EnvVariables.DB_PASSWORD),
      ),
      database: config.get(
        EnvVariables.DB_DATABASE,
        env.getValue(EnvVariables.DB_DATABASE),
      ),
      synchronize: true,
    };
  }

  getAppPort(): any {
    return this.envConfig.getValue(EnvVariables.APP_PORT);
  }
}
