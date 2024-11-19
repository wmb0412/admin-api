import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import * as svgCaptcha from 'svg-captcha';
import { v4 as uuidV4 } from 'uuid';

const PREDIS_CAPTCHA_KEY = 'captcha_';
@Injectable()
export class CaptchaService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  getRedisKey(id: string) {
    return `${PREDIS_CAPTCHA_KEY}${id}`;
  }
  async createCaptcha() {
    const { data, text } = svgCaptcha.create({
      height: 32,
      width: 100,
    });
    const id = uuidV4();
    await this.redis.setex(this.getRedisKey(id), 2 * 60, text);
    return {
      id,
      data,
    };
  }
  async validateCaptcha(id: string, text: string) {
    const redisText = await this.redis.get(this.getRedisKey(id));
    return redisText?.toUpperCase() == text?.toUpperCase();
  }
}
