import { HttpException } from '@nestjs/common';

export class ErrorExceptionFilter extends HttpException {
  constructor(data) {
    super(data, 200);
  }
}
