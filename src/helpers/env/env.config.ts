import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class EnvConfiguration {
  private readonly parsedConfig: dotenv.DotenvParseOutput;

  constructor() {
    const { error, parsed } = dotenv.config();
    if (error) throw new Error(error.message);

    this.parsedConfig = parsed as dotenv.DotenvParseOutput;
  }

  getConfig(key: string): string | undefined {
    const config = this.parsedConfig[key];
    return config;
  }
}
