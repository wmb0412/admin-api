export class ErrorResult {
  static DEFAULT = '服务器错误';
  static INVALID_PARAMS = '无效的参数';
  static USER_ALREADY_EXISTS = '用户已存在';
  static USER_PASSWORD_ERROR = '1001:用户名或密码错误';
  static USER_NOT_FOUND = '用户不存在';
  static USER_NOT_LOGIN = '用户未登录';
  static SUBSCRIBE_NOT_FOUND = '订阅不存在';
  static INVALID_CAPTCHA = '10003:验证码错误';
  static INSUFFICIENT_BALANCE = '10004:余额不足';
  static getData(message: string, code = -1) {
    return {
      code,
      message,
    };
  }
}
