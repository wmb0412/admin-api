import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { EmailService } from 'src/common/services/email.service';

@Module({
  controllers: [SubscribeController],
  providers: [SubscribeService, EmailService],
})
export class SubscribeModule {}
