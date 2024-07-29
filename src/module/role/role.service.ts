import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    const { permissionIds, id, ...rest } = createRoleDto;
    if (id) {
      return this.prisma.role.update({
        data: {
          ...rest,
          permissions: {
            set: permissionIds.map((id) => ({ id })),
          },
        },
        where: {
          id,
        },
      });
    } else {
      return this.prisma.role.create({
        data: {
          ...rest,
          permissions: {
            connect: permissionIds.map((id) => ({ id })),
          },
        },
      });
    }
  }

  findAll() {
    return this.prisma.role.findMany({
      include: {
        permissions: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
