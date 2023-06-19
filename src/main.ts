import { NestFactory } from '@nestjs/core';
import { AppModule } from './views/app';
import { SwaggerConfig } from './helpers/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig.setup(app);
  await app.listen(3000);
}
bootstrap();
