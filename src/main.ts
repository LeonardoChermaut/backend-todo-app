import { NestFactory } from '@nestjs/core';
import { AppModule } from './domain/views/app';
import { SwaggerDocumentBuilderModule } from './helpers/swagger/config';
import { UseGlobalHttpFilter } from './domain/http/exception';
import { UseGlobalValidationPipe } from './domain/validation/common/use.validation.pipe';
import { EnvConfiguration } from './helpers/env';
import { log } from 'console';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new UseGlobalHttpFilter());
  app.useGlobalPipes(new UseGlobalValidationPipe());

  const envConfig = app.get(EnvConfiguration);
  const port = envConfig.getConfig('APP_PORT');

  SwaggerDocumentBuilderModule.setup(app);

  await app.listen(port);
  log(`Application is running on port: [${port}]`);
};

bootstrap();
