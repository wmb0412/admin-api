import { HttpException } from '@nestjs/common';

export class ErrorExceptionFilter extends HttpException {
  constructor(data, status = 200) {
    super(data, status);
  }
}
