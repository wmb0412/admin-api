export const CommonError = {
  code: 10000,
  message: '服务器错误',
};
export const getInvalidParams = (message = '无效的参数') => ({
  code: 10001,
  message,
});
export const userAlreadyExited = {
  code: 10002,
  message: '用户已存在',
};
export const userPasswordError = {
  code: 10003,
  message: '用户名或密码错误',
};
export const Unauthorized = {
  code: 10004,
  message: '用户未登录',
};
