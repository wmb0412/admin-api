import { Controller, Post, Body } from '@nestjs/common';
import { DingdingService } from './dingding.service';
import { SendMessageDingdingDto } from './dto/sendMessageDingdingDto';

@Controller('dingding')
export class DingdingController {
  constructor(private readonly dingdingService: DingdingService) {}

  @Post('sendMessageByPhone')
  sendMessageByPhone(@Body() body: SendMessageDingdingDto) {
    return this.dingdingService.sendMessageByPhone(body);
  }
}
