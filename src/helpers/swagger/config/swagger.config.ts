import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class SwaggerDocumentBuilderModule {
  static setup(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle('Todo API NESTJS')
      .setDescription('API para aplicação de tarefas')
      .addTag('Todo')
      .setVersion('1.0')
      .setContact(
        'Leonardo Chermaut',
        'https://github.com/leonardochermaut',
        'leonardochermaut.jobs@gmail.com',
      )
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }
}
