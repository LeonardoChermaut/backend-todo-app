import { NestFactory } from '@nestjs/core';
import { AppModule } from './domain/views/app';
import { SwaggerDocumentBuilderModule } from './helpers/swagger/config';
import { UseGlobalHttpFilter } from './domain/http/exception';
import { UseGlobalValidationPipe } from './domain/validation/common/use.validation.pipe';

const PORT = process.env.PORT || 3000;
const IS_CORS: object = { cors: true };

async function bootstrap() {
  const app = await NestFactory.create(AppModule, IS_CORS);
  app.useGlobalFilters(new UseGlobalHttpFilter());
  app.useGlobalPipes(new UseGlobalValidationPipe());
  SwaggerDocumentBuilderModule.setup(app);

  await app.listen(PORT);
}
bootstrap();
