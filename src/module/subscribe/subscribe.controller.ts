import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeCreateDto } from './dto/subscribe.dto';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}
  /**
   * 创建订阅
   */
  @Post()
  async create(@Body() data: SubscribeCreateDto) {
    return await this.subscribeService.create(data);
  }

  @Get()
  async getAllSubscribe() {
    return await this.subscribeService.getAllSubscribe();
  }
  @Post('trigger')
  async trigger(@Body() body) {
    return await this.subscribeService.trigger(+body?.id);
  }
}
