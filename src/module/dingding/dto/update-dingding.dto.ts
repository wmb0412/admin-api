import { PartialType } from '@nestjs/swagger';
import { CreateDingdingDto } from './create-dingding.dto';

export class UpdateDingdingDto extends PartialType(CreateDingdingDto) {}
