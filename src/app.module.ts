import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './common/constant/jwt.constant';
import { validatePipe } from './common/pipe/validate.pipe';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SheetModule } from './module/sheet/sheet.module';
import { RoleModule } from './module/role/role.module';
import { PermissionModule } from './module/permission/permission.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { HttpExceptionFilter } from './common/filter/HttpExceptionFilter.filter';
import { AuthGuard } from './common/guard/auth.guard';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { AllExceptionsFilter } from './common/filter/AllExceptions.filter';
import { GlobalModule } from './module/global.module';
import { EnvConfigService } from './common/services/envConfig.service';
export const UPLOADS_DIR = join(__dirname, '../uploads');

@Module({
  imports: [
    GlobalModule,
    RedisModule.forRootAsync({
      inject: [EnvConfigService],
      useFactory: (configService: EnvConfigService) =>
        configService.getRedisConfig(),
    }),
    ServeStaticModule.forRoot({
      rootPath: UPLOADS_DIR,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: `${30 * 24 * 60 * 60}s`,
      },
    }),
    UserModule,
    AuthModule,
    // WeixinModule,
    SheetModule,
    RoleModule,
    PermissionModule,
    // ConfigModule,
  ],
  controllers: [],
  providers: [
    HttpExceptionFilter,
    {
      provide: APP_PIPE,
      useClass: validatePipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
