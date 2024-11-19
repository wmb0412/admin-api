import { Inject, Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/read-user.dto';
import { BizHttpException } from 'src/common/filter/BizHttpException';
import { ErrorResult } from 'src/common/constant/error.constant';
// import { PrismaService } from 'src/module/prisma/prisma.service';
import Decimal from 'decimal.js';
import { sleep } from 'src/common/utils';
import { CaptchaService } from 'src/common/services/captcha.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly captchaService: CaptchaService,
  ) {}
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
      throw new BizHttpException(ErrorResult.USER_ALREADY_EXISTS);
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
  async transferAccount(body, res) {
    // 1. 转账两个用户要一起改，所以需要transaction
    // 2. 在find和update过程中balance可能被改了 -> 数据不准确 要加锁
    // 2.1 乐观锁 数据库中添加version或时间戳 修改的时候where version=oldVersion     可能导致更新不了
    // 2.2 悲观锁  用sql锁定数据库
    // 2.3 转账的场景适合用悲观锁
    return await this.prisma.$transaction(async (prisma) => {
      const userId = res.user.id;
      if (userId == body.userId) {
        throw new BizHttpException(ErrorResult.INVALID_PARAMS);
      }
      const fromUser = await prisma.user.findFirst({
        where: { id: userId },
      });
      const toUser = await prisma.user.findFirst({
        where: { id: body.userId },
      });
      // 换成悲观锁 FOR UPDATE
      // const [fromUser] = await prisma.$queryRaw<
      //   User[]
      // >`SELECT * FROM \`User\` WHERE \`id\` = ${userId} FOR UPDATE`;
      // const [toUser] = await prisma.$queryRaw<
      //   User[]
      // >`SELECT * FROM \`User\` WHERE \`id\` = ${body.userId} FOR UPDATE`;
      // if (!fromUser || !toUser) {
      //   throw new BizHttpException(commonError('用户没找到'));
      // }

      if (new Decimal(fromUser.balance).minus(body.amount).lt(0)) {
        throw new BizHttpException(ErrorResult.INSUFFICIENT_BALANCE);
      }
      await prisma.user.update({
        where: { id: userId },
        data: {
          balance: new Decimal(fromUser.balance).minus(body.amount),
        },
      });
      await prisma.user.update({
        where: { id: toUser.id },
        data: {
          balance: new Decimal(toUser.balance).plus(body.amount),
        },
      });
    });
  }
  async locked(body) {
    const { userId, locked } = body;
    // const prisma = this.prisma;
    // setTimeout(() => {
    //   async function changeLocked() {
    //     const user = await prisma.user.findFirst({ where: { id: userId } });
    //     const updateRes = await prisma.user.update({
    //       where: { id: userId },
    //       data: {
    //         locked,
    //       },
    //     });
    //   }
    //   changeLocked();
    // }, 1000);
    // 两个请求先后隔一秒发出， 第一个请求也要等8秒
    // sleep(4000);
    // 加了微任务， 两个请求先后隔一秒发出， 第一个请求只要等4秒
    await new Promise((resolve) =>
      setTimeout(() => {
        sleep(4000);
        resolve(1);
      }, 0),
    );
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        locked,
        // locked: 2,
      },
    });
  }

  async getCaptcha() {
    return this.captchaService.createCaptcha();
  }
}
