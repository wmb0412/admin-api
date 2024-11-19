import { Module } from '@nestjs/common';
import { DingdingService } from './dingding.service';
import { DingdingController } from './dingding.controller';

@Module({
  controllers: [DingdingController],
  providers: [DingdingService],
})
export class DingdingModule {}
