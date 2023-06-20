import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle('Todo API NESTJS')
      .setDescription('API para aplicação de tarefas')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }
}
