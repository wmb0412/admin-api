import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PrismaService],
})
export class PermissionModule {}
