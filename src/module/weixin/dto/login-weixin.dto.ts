export class LoginWeixinDto {
  code: string;
}

export class TokenWeixinDto {
  session_key: string;
  openid: string;
}

export class userInfoDto {
  encryptedData: string;
  iv: string;
}
