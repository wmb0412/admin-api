import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Req,
} from '@nestjs/common';
import { WeixinService } from './weixin.service';
import { CreateWeixinDto } from './dto/create-weixin.dto';
import { UpdateWeixinDto } from './dto/update-weixin.dto';
import {
  LoginWeixinDto,
  TokenWeixinDto,
  userInfoDto,
} from './dto/login-weixin.dto';
import { Public } from 'src/decorator/public.decorator';

@Controller('weixin')
export class WeixinController {
  constructor(private readonly weixinService: WeixinService) {}

  @Post()
  create(@Body() createWeixinDto: CreateWeixinDto) {
    return this.weixinService.create(createWeixinDto);
  }
  @Public()
  @Post('login')
  login(@Body() loginWeixinDto: LoginWeixinDto) {
    return this.weixinService.login(loginWeixinDto);
  }
  @Post('userInfo')
  userInfo(
    @Req() request: { user: TokenWeixinDto },
    @Body() userInfo: userInfoDto,
  ) {
    const { session_key, openid } = request.user;
    const { iv, encryptedData } = userInfo;
    return this.weixinService.userInfo({
      session_key,
      openid,
      iv,
      encryptedData,
    });
  }
  @Get('phone')
  getPhone(@Param('code') code: string) {
    return this.weixinService.getPhone(code);
  }
  @Get()
  findAll() {
    return this.weixinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weixinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeixinDto: UpdateWeixinDto) {
    return this.weixinService.update(+id, updateWeixinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weixinService.remove(+id);
  }
}
