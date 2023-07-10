import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvModule, EnvService } from '../../../../helpers/env';
import { configuration } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, EnvModule],
      inject: [ConfigService, EnvService],
      useFactory: (configService: ConfigService, envService: EnvService) =>
        configuration(configService, envService),
    }),
  ],
})
export class TypeOrmConfigurationModule {}
