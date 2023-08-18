import {
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Catch,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ResponseDto } from 'src/common/dto/ResponseDto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const states = exception.getStatus();
    const { message, code } = exception.getResponse() as any;
    response.status(states).json(new ResponseDto(code, null, message));
  }
}
