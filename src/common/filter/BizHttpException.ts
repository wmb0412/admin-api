import { HttpException } from '@nestjs/common';

export class BizHttpException extends HttpException {
  constructor(data: BizHttpExceptionData | string, status = 200) {
    if (typeof data === 'object') {
      super(data, status);
      return;
    }
    const hasCode = data?.includes(':');
    const message = hasCode ? data?.split(':')[1] : data;
    const code = hasCode ? +data?.split(':')[0] : -1;
    super({ message, code }, status);
  }
}
