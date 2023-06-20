import { Module } from '@nestjs/common';
import { TodoModule } from '../todo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigurationModule } from '../../../helpers/infra/config';

@Module({
  imports: [TypeOrmConfigurationModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
