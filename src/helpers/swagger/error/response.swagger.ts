import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ISwaggerResponse } from './response.iswagger';

export abstract class SwaggerResponse implements ISwaggerResponse {
  @ApiProperty()
  statusCode: HttpStatus;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;

  constructor(statusCode: HttpStatus, message: string[], error: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
