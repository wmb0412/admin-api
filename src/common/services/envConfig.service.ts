import { RedisModuleOptions } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvConfigService {
  getWxConfig() {
    return {
      AppId: process.env.WEIXIN_CONFIG_AppId,
      AppSecret: process.env.WEIXIN_CONFIG_AppSecret,
    };
  }
  getRedisConfig(): RedisModuleOptions {
    return {
      type: 'single',
      url: process.env.REDIST_URL,
    };
  }
  getEmailConfig() {
    return {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    };
  }

  getDingdingConfig() {
    return {
      appKey: process.env.DINGDING_APP_KEY,
      appSecret: process.env.DINGDING_APP_SECRET,
      agentId: process.env.DINGDING_AGENT_ID,
    };
  }
}
