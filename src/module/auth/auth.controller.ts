import { Controller, Post, Body, Res, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  SignInAuthDto,
  userLoginResponse,
} from './dto/create-auth.dto';
import { ResponseDto } from 'src/common/dto/ResponseDto';
import { ApiResult } from 'src/common/swagger/ApiResult';
import { Public } from 'src/common/decorator/public.decorator';
import { Response } from 'express';

@ApiTags('身份认证')
@Controller('auth')
@Public()
@ApiExtraModels(ResponseDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @ApiOperation({ summary: '用户注册' })
  @Post('signUp')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @ApiOperation({ summary: '用户登录' })
  @ApiResult(userLoginResponse)
  @Post('signIn')
  @Public()
  signIn(
    @Body() signInAuthDto: SignInAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(signInAuthDto, res);
  }
  @Post('signOut')
  signOut(@Res({ passthrough: true }) res: Response) {
    return this.authService.signOut(res);
  }
}
