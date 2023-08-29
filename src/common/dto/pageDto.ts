import { ApiProperty } from '@nestjs/swagger';

export class QueryPageDto {
  @ApiProperty({
    default: 10,
  })
  pageSize = 10;
  @ApiProperty({
    default: 1,
  })
  pageNo = 1;
}
