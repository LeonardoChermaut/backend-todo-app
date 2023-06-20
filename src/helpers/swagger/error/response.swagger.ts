import { ApiProperty } from '@nestjs/swagger';
import { ISwaggerResponse } from './response.iswagger';
import { HttpStatusCode } from './response.iswagger';

export abstract class SwaggerResponse implements ISwaggerResponse {
  @ApiProperty()
  statusCode: HttpStatusCode;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;

  constructor(statusCode: HttpStatusCode, message: string[], error: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
