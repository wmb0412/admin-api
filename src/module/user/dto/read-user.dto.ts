import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { OrderEnum } from 'src/common/constant/query.constant';

export class QueryUserDto {
  @ApiProperty({
    default: 10,
  })
  pageSize = 10;
  @ApiProperty({
    default: 1,
  })
  @IsNotEmpty()
  pageNo = 1;

  sortBy?: string;
  orderBy?: OrderEnum;
  filters?: Record<string, any>;
}
