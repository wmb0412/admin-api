import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApiResult } from 'src/common/swagger/ApiResult';
import { User } from './entities/user.entity';
import { QueryUserDto } from './dto/read-user.dto';
import { AuthService } from '../auth/auth.service';
import { SignInAuthDto } from '../auth/dto/create-auth.dto';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('用户模块')
@Public()
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
  login(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signIn(signInAuthDto);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
