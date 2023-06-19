import { Module } from '@nestjs/common';
import { TodoModule } from 'src/views/todo';
import { AppController, AppService } from 'src/views/app';
import { TypeOrmConfigurationModule } from 'src/config/type.orm.config.module';

@Module({
  imports: [TypeOrmConfigurationModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
