import { ApiProperty } from '@nestjs/swagger';
import { jwtConstants } from 'src/common/constant/jwt.constant';
export class CreateAuthDto {
  @ApiProperty({
    description: '用户名',
    default: 'zhangsan',
  })
  username: string;
  @ApiProperty()
  password: string;
}
export class SignInAuthDto {
  @ApiProperty({
    description: '用户名',
    default: 'zhangsan',
  })
  username: string;
  @ApiProperty()
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
