import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SheetService } from './sheet.service';

@Controller('sheet')
export class SheetController {
  constructor(private readonly sheetService: SheetService) {}
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.sheetService.findById(id);
  }
  @Post()
  create(@Body() data) {
    return this.sheetService.update(data);
  }
}
