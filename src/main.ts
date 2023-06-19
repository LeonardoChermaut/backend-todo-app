import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/views/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
