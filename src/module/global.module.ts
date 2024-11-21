import { Global, Module } from '@nestjs/common';
import { CaptchaService } from 'src/common/services/captcha.service';
import { EnvConfigService } from 'src/common/services/envConfig.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { WinstonLoggerService } from 'src/common/services/WinstonLogger.service';

const GLOBAL_PROVIDERS = [
  EnvConfigService,
  PrismaService,
  CaptchaService,
  {
    provide: 'LoggerService',
    useClass: WinstonLoggerService,
  },
];
@Global()
@Module({
  providers: GLOBAL_PROVIDERS,
  exports: GLOBAL_PROVIDERS,
  imports: [],
})
export class GlobalModule {}
