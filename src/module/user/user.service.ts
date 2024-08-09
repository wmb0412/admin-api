import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/read-user.dto';
import { ErrorExceptionFilter } from 'src/common/filter/ErrorExceptionFilter';
import { userAlreadyExited } from 'src/common/constant/error.constant';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  encryptPassword(password?: string) {
    if (!password) {
      return password;
    }
    return hashSync(password, genSaltSync(10));
  }
  async create(createUserDto: CreateUserDto) {
    const { password, username, roleIds } = createUserDto;
    const user = await this.findOne(username);
    if (user) {
      throw new ErrorExceptionFilter(userAlreadyExited);
    }
    return this.prisma.user.create({
      data: {
        username,
        password: this.encryptPassword(password),
        roles: {
          connect: roleIds?.map((id) => ({ id })),
        },
      },
    });
  }

  async findAll(queryUser: QueryUserDto) {
    const {
      pageSize,
      pageNo,
      orderBy = 'desc',
      sortBy = 'updatedAt',
      filters,
      searchName,
    } = queryUser;
    const limit = pageSize * (pageNo - 1);
    const searchWhere = {
      username: {
        contains: searchName,
      },
    };
    const where: any = filters
      ? Object.keys(filters).reduce((_map, key) => {
          if (filters[key]) {
            if (key === 'roles') {
              _map[key] = {
                some: {
                  id: {
                    in: filters[key],
                  },
                },
              };
            } else {
              _map[key] = {
                in: filters[key],
              };
            }
          }
          return _map;
        }, searchWhere)
      : searchWhere;
    const list = await this.prisma.user.findMany({
      orderBy: {
        // updatedAt: 'desc',
        [sortBy]: orderBy,
      },
      where,
      take: Number(pageSize),
      skip: limit,
      include: {
        roles: true,
      },
      omit: {
        password: true,
      },
    } as any);
    const total = await this.prisma.user.count({
      where,
    });
    return {
      list,
      total,
      pageSize,
      pageNo,
    };
  }

  async findOne(username: string) {
    return this.prisma.user.findFirst({
      where: { username },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, roleIds } = updateUserDto;
    return this.prisma.user.update({
      where: { id },
      data: {
        username,
        password: this.encryptPassword(password),
        roles: {
          set: roleIds?.map((id) => ({ id })),
        },
      },
    });
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
    return;
  }
  async info(res) {
    const userId = res.user.id;
    const userBaseInfo = await this.prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        roles: true,
      },
    });
    const permissions = await this.prisma.permission.findMany({
      where: {
        roles: {
          some: {
            id: {
              in: userBaseInfo.roles.map((item) => item.id),
            },
          },
        },
      },
    });
    return {
      ...userBaseInfo,
      permissions,
    };
  }
}
