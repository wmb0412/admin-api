import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @Get('list')
  findAll() {
    return this.permissionService.findAll();
  }
  @Post()
  create(@Body() createPermission: CreatePermissionDto) {
    return this.permissionService.create(createPermission);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.permissionService.delete(id);
  }
}
