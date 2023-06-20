import { NestFactory } from '@nestjs/core';
import { AppModule } from './domain/views/app';
import { SwaggerDocumentBuilderModule } from './helpers/swagger/config';
import { UseGlobalHttpFilter } from './domain/http/exception';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new UseGlobalHttpFilter());
  SwaggerDocumentBuilderModule.setup(app);

  await app.listen(PORT);
}
bootstrap();
