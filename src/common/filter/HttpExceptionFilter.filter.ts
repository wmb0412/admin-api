import {
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Catch,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from 'src/common/dto/ResponseDto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject('LoggerService') private readonly logger: LoggerService,
  ) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const states = exception.getStatus();
    const { message, code } = exception.getResponse() as any;
    if (code) {
      this.logger.error(`${ctx.getRequest().url} -> ${code} - ${message}`);
    }
    response.status(states).json(new ResponseDto(code, null, message));
  }
}
