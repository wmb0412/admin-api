import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApiResult } from 'src/common/swagger/ApiResult';
import { User } from './entities/user.entity';
import { QueryUserDto } from './dto/read-user.dto';
import { AuthService } from '../auth/auth.service';
import { SignInAuthDto } from '../auth/dto/create-auth.dto';
import { Public } from 'src/decorator/public.decorator';
import { Response } from 'express';

@ApiTags('用户模块')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '获取用户列表' })
  @ApiResult(User, true)
  @Post('list')
  findAll(@Body() queryUser: QueryUserDto) {
    return this.userService.findAll(queryUser);
  }

  @Public()
  @Post('login')
  login(
    @Body() signInAuthDto: SignInAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(signInAuthDto, res);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
