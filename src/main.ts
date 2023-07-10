import { NestFactory } from '@nestjs/core';
import { AppModule } from './domain/views/app';
import { SwaggerDocumentBuilderModule } from './helpers/swagger/config';
import { UseGlobalHttpFxceptionFilter } from './domain/http/exception';
import { UseGlobalValidationPipe } from './domain/http/validation';
import { EnvService } from './helpers/env';
import { log } from 'console';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new UseGlobalHttpFxceptionFilter());
  app.useGlobalPipes(new UseGlobalValidationPipe());

  const env = app.get(EnvService);
  const port = env.getAppPort();

  SwaggerDocumentBuilderModule.setup(app);

  await app.listen(port);
  log(`Application is running on port: [${port}]`);
};

bootstrap();
