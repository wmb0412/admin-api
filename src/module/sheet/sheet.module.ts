import { Module } from '@nestjs/common';
import { SheetService } from './sheet.service';
import { SheetController } from './sheet.controller';

@Module({
  controllers: [SheetController],
  providers: [SheetService],
})
export class SheetModule {}
