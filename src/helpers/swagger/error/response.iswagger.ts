import { HttpStatus } from '@nestjs/common';

export interface ISwaggerResponse {
  statusCode: HttpStatus;
  message: string[];
  error: string;
}
