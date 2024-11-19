import { Injectable } from '@nestjs/common';
import { ErrorResult } from 'src/common/constant/error.constant';
import { BizHttpException } from 'src/common/filter/BizHttpException';
import { EmailService } from 'src/common/services/email.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class SubscribeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
  ) {}
  create(data) {
    return this.prisma.subscribe.create({ data });
  }
  getAllSubscribe() {
    return this.prisma.subscribe.findMany();
  }
  async trigger(id) {
    const subscribe = await this.prisma.subscribe.findFirst({ where: { id } });
    if (!subscribe) {
      throw new BizHttpException(ErrorResult.SUBSCRIBE_NOT_FOUND);
    }
    const { users } = subscribe;
    const userList = await this.prisma.user.findMany({
      where: {
        id: {
          in: users as number[],
        },
      },
    });
    const { title, text } = subscribe;
    await Promise.all(
      userList.map(async (user) => {
        if (user?.email) {
          await this.email.SendEMail({
            subject: title,
            text,
            to: user.email,
          });
        }
      }),
    );
    return;
  }
}
