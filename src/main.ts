import { NestFactory } from '@nestjs/core';
import { AppModule } from './domain/views/app';
import { SwaggerConfig } from './helpers/swagger/config';
import { UseGlobalHttpFilter } from './helpers/infra/http/exception';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new UseGlobalHttpFilter());
  SwaggerConfig.setup(app);
  await app.listen(PORT);
}
bootstrap();
