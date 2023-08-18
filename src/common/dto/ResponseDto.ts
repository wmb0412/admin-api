export class ResponseDto<T> {
  readonly data: T;
  readonly code: number;
  readonly message: string;
  constructor(code: number, data?: any, message = 'success') {
    this.code = code;
    this.data = data;
    this.message = message;
  }
}
