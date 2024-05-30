import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './common/constant/jwt.constant';
import { validatePipe } from './common/pipe/validate.pipe';
import { APP_PIPE } from '@nestjs/core';
import { MusicModule } from './module/music/music.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DemoModule } from './module/demo/demo.module';
import { WeixinModule } from './module/weixin/weixin.module';
import { DB_CONFIG } from 'src/config/db.config';
export const UPLOADS_DIR = join(__dirname, '../uploads');

@Module({
  imports: [
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
    TypeOrmModule.forRoot(DB_CONFIG),
    UserModule,
    AuthModule,
    MusicModule,
    DemoModule,
    WeixinModule,
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
