import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionHandler extends HttpException {
  constructor(type: string, status: HttpStatus) {
    super(type, status);
  }
}
