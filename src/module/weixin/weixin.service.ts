import { Injectable, Req } from '@nestjs/common';
import { CreateWeixinDto } from './dto/create-weixin.dto';
import { UpdateWeixinDto } from './dto/update-weixin.dto';
import {
  LoginWeixinDto,
  TokenWeixinDto,
  userInfoDto,
} from './dto/login-weixin.dto';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { getWeixinUserInfo } from 'src/common/utils/weixin';
import { WEIXIN_CONFIG } from 'src/config/weixin.config';
@Injectable()
export class WeixinService {
  constructor(private readonly jwtService: JwtService) {}
  create(createWeixinDto: CreateWeixinDto) {
    return 'This action adds a new weixin';
  }
  async login(loginWeixinDto: LoginWeixinDto) {
    console.log('loginWeixinDto', loginWeixinDto);
    const { code } = loginWeixinDto;
    const { AppId, AppSecret } = WEIXIN_CONFIG;
    const res: { data: TokenWeixinDto } = await axios.get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${AppId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`,
    );

    const access_token = await this.jwtService.signAsync(res.data);
    return {
      access_token,
    };
  }
  async userInfo(userInfo: TokenWeixinDto & userInfoDto) {
    const { session_key, iv, encryptedData } = userInfo;
    const userData = getWeixinUserInfo({
      sessionKey: session_key,
      iv,
      encryptedData,
      appId: WEIXIN_CONFIG.AppId,
    });
    console.log('userdata', userData);
    return userData;
  }
  async getPhone(code) {
    const res = await axios.get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WEIXIN_CONFIG.AppId}&secret=${WEIXIN_CONFIG.AppSecret}`,
    );
    console.log('resresres', res.data);
    const phoneRes = await axios.post(
      `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${res.data.access_token}`,
      {
        data: {
          code,
        },
      },
    );
    return phoneRes.data;
  }
  findAll() {
    return `This action returns all weixin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weixin`;
  }

  update(id: number, updateWeixinDto: UpdateWeixinDto) {
    return `This action updates a #${id} weixin`;
  }

  remove(id: number) {
    return `This action removes a #${id} weixin`;
  }
}
