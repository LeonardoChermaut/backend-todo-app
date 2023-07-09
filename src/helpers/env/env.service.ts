import { Injectable } from '@nestjs/common';
import { IEnv } from './env.interface';
import { EnvConfiguration } from 'src/helpers/env';

@Injectable()
export class EnvService implements IEnv {
  constructor(private envConfig: EnvConfiguration) {}

  getDatabase(): any {
    return {
      host: this.envConfig.getConfig('DB_HOST'),
      port: this.envConfig.getConfig('DB_PORT'),
      user: this.envConfig.getConfig('DB_USERNAME'),
      password: this.envConfig.getConfig('DB_PASSWORD'),
      db: this.envConfig.getConfig('DB_DATABASE'),
    };
  }

  getAppPort(): any {
    return this.envConfig.getConfig('APP_PORT');
  }
}
