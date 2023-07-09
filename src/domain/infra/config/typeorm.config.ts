import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvService } from '../../../helpers/env';

export const configuration = (
  configService: ConfigService,
  envService: EnvService,
): TypeOrmModuleOptions => {
  const { host, port, username, password, db } = envService.getDatabase();

  return {
    type: 'mariadb',
    host: configService.get<string>('DB_HOST', host),
    port: configService.get<number>('DB_PORT', port),
    username: configService.get<string>('DB_USERNAME', username),
    password: configService.get<string>('DB_PASSWORD', password),
    database: configService.get<string>('DB_DATABASE', db),
    synchronize: true,
    entities: ['dist/**/*.entity.{ts,js}'],
  };
};
