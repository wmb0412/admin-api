import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { EmailService } from 'src/common/services/email.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [EmailService, UserService, AuthService, Logger],
  exports: [UserService],
})
export class UserModule {}
