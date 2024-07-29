import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, AuthService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
