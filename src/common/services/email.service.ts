import { Inject, Injectable, LoggerService } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EnvConfigService } from './envConfig.service';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private envConfigService: EnvConfigService,
    @Inject('LoggerService') private readonly logger: LoggerService,
  ) {
    this.transporter = nodemailer.createTransport(
      this.envConfigService.getEmailConfig(),
    );
  }
  async SendEMail({ to, subject, text }) {
    try {
      await this.transporter.sendMail({
        from: this.envConfigService.getEmailConfig().auth.user,
        to,
        subject,
        text,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
