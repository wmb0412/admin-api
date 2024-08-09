import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './common/constant/jwt.constant';
import { validatePipe } from './common/pipe/validate.pipe';
import { APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { WeixinModule } from './module/weixin/weixin.module';
import { ConfigModule } from '@nestjs/config';
import { SheetModule } from './module/sheet/sheet.module';
import { RoleModule } from './module/role/role.module';
import { PermissionModule } from './module/permission/permission.module';
import configuration from 'config/configuration';
export const UPLOADS_DIR = join(__dirname, '../uploads');

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: UPLOADS_DIR,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: `${60 * 60}s`,
      },
    }),
    UserModule,
    AuthModule,
    // WeixinModule,
    SheetModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: validatePipe,
    },
  ],
})
export class AppModule {}
