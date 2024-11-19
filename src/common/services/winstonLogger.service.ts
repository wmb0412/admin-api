import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private readonly logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
      }),
    ),
    transports: [
      new transports.Console(),
      new DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      }),
    ],
  });
  log(message: string) {
    this.logger.info(message);
  }
  error(message: any) {
    console.log(';;;dd', message);
    this.logger.error(message);
  }
  warn(message: any) {
    this.logger.warn(message);
  }
  debug?(message: any) {
    this.logger.debug(message);
  }
  verbose?(message: any) {
    this.logger.verbose(message);
  }
}
