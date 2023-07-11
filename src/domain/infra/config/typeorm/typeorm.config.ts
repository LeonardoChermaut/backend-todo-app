import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvService } from '../../../../helpers/env';

export const configuration = (
  config: ConfigService,
  env: EnvService,
): TypeOrmModuleOptions => {
  const { type, host, port, username, password, database, synchronize } =
    env.getDatabase(config);

  return {
    type,
    host,
    port,
    username,
    password,
    database,
    synchronize,
    entities: ['dist/**/*.entity.{ts,js}'],
  };
};
