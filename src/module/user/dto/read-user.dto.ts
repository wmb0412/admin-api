import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
}
