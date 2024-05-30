import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Query,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApiResult } from 'src/common/swagger/ApiResult';
import { User } from './entities/user.entity';
import { QueryUserDto } from './dto/read-user.dto';
import { AuthService } from '../auth/auth.service';
import { SignInAuthDto } from '../auth/dto/create-auth.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  @Get('list')
  findAll(@Query() queryUser: QueryUserDto) {
    return this.userService.findAll(queryUser);
  }
  @ApiOperation({ summary: '新增用户' })
  @Post()
  create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }
  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.remove(id);
  }
  @ApiOperation({ summary: '用户编辑' })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
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
