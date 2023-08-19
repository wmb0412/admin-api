import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

import { jwtConstants } from 'src/common/constant/jwt.constant';
export class CreateAuthDto {
  @ApiProperty({
    description: '用户名',
    default: 'zhangsan',
  })
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;
  @ApiProperty()
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
export class SignInAuthDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @ApiProperty({
    description: '用户名',
    default: 'zhangsan',
  })
  username: string;
  @ApiProperty()
  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}

export class userLoginResponse {
  @ApiProperty({
    description: '用户令牌',
  })
  access_token: string;
  @ApiProperty({
    description: '用户令牌类型',
    default: jwtConstants.token_type,
  })
  token_type: string;
}
