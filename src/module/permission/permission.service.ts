import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './permission.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.permission.findMany();
  }
  async create(data: CreatePermissionDto) {
    // return this.prisma.permission.upsert({
    //   where: {
    //     id: data.id,
    //   },
    //   create: data,
    //   update: data,
    // });
    if (data.id) {
      return await this.prisma.permission.update({
        where: {
          id: data.id,
        },
        data,
      });
    } else {
      return await this.prisma.permission.create({
        data,
      });
    }
  }
  delete(id: number) {
    return this.prisma.permission.delete({ where: { id } });
  }
}
