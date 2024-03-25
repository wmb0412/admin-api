import { PartialType } from '@nestjs/swagger';
import { CreateWeixinDto } from './create-weixin.dto';

export class UpdateWeixinDto extends PartialType(CreateWeixinDto) {}
