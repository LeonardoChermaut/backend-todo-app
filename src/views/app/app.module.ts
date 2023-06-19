import { Module } from '@nestjs/common';
import { TodoModule } from '../todo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigurationModule } from 'src/config/type.orm.config.module';

@Module({
  imports: [TypeOrmConfigurationModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
