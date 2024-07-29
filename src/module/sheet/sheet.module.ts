import { Module } from '@nestjs/common';
import { SheetService } from './sheet.service';
import { SheetController } from './sheet.controller';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [SheetController],
  providers: [SheetService, PrismaService],
})
export class SheetModule {}
