import { ApiProperty } from '@nestjs/swagger';
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
