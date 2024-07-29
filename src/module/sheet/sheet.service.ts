import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class SheetService {
  constructor(private readonly prisma: PrismaService) {}
  findById(id) {
    return this.prisma.sheet.findFirst({ where: { id } });
  }
  update(data) {
    return this.prisma.sheet.upsert({
      where: { id: data.id },
      update: {
        context: data.context,
      },
      create: data,
    });
  }
}
