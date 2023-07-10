import { Module } from '@nestjs/common';
import { TodoModule } from '../todo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigurationModule } from '../../infra/config/typeorm';
import { EnvModule } from '../../../helpers/env';

@Module({
  imports: [TypeOrmConfigurationModule, TodoModule, EnvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
