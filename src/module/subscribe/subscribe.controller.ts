import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}
  @Post()
  async create(@Body() data) {
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
