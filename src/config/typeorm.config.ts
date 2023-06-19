import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configuration = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mariadb',
  host: configService.get(process.env.DB_HOST, 'localhost'),
  port: Number(configService.get(process.env.DB_PORT, '3307')),
  username: configService.get(process.env.DB_USERNAME, 'root'),
  password: configService.get(process.env.DB_PASSWORD, 'root'),
  database: configService.get(process.env.DB_DATABASE, 'todoapp'),
  synchronize: true,
  entities: [__dirname + '/**/*.entity.{ts,js}'],
});
