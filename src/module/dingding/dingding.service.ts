import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SendMessageDingdingDto } from './dto/sendMessageDingdingDto';
import { BizHttpException } from 'src/common/filter/BizHttpException';
import { EnvConfigService } from 'src/common/services/envConfig.service';

@Injectable()
export class DingdingService {
  constructor(private readonly envConfigService: EnvConfigService) {}
  async getUserIdByPhone(phone) {
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://oapi.dingtalk.com/topapi/v2/user/getbymobile',
        params: {
          access_token: await this.getToken(),
        },
        data: {
          mobile: phone,
        },
      });
      return res.data.result.userid;
    } catch (error) {
      throw new BizHttpException('钉钉里没这个人');
    }
  }
  async getToken() {
    const { appKey, appSecret } = this.envConfigService.getDingdingConfig();
    const res = await axios({
      url: 'https://oapi.dingtalk.com/gettoken',
      method: 'GET',
      params: {
        appkey: appKey,
        appsecret: appSecret,
      },
    });
    return res.data.access_token;
  }
  async sendMessageByPhone(sendMessageDingdingDto: SendMessageDingdingDto) {
    const { phone, title, content } = sendMessageDingdingDto;
    const dingdingUserId = await this.getUserIdByPhone(phone);
    const { agentId } = this.envConfigService.getDingdingConfig();
    await axios({
      method: 'POST',
      url: 'https://oapi.dingtalk.com/topapi/message/corpconversation/asyncsend_v2',
      params: {
        access_token: await this.getToken(),
      },
      data: {
        agent_id: agentId,
        userid_list: dingdingUserId,
        msg: { msgtype: 'markdown', markdown: { title, text: content } },
      },
    });
    return true;
  }
}
