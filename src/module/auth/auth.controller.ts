import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto, SignInAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from '../user/entities/user.entity';
import { ResponseDto } from 'src/common/dto/ResponseDto';
import { ApiResult } from 'src/common/swagger/ApiResult';

@ApiTags('身份认证')
@Controller('auth')
@ApiExtraModels(ResponseDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @ApiOkResponse({ type: User })
  @ApiResult(User)
  @ApiOperation({ summary: '用户注册' })
  @Post('signUp')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @ApiOperation({ summary: '用户登录' })
  @ApiResult(User)
  @Post('signIn')
  signIn(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signIn(signInAuthDto);
  }
}
