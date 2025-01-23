import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class ScheduleService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'EVERY_10_SECONDS',
  })
  handleCron() {
    console.log('EVERY_10_SECONDS');
    this.stopScheduler('EVERY_10_SECONDS');
    this.addScheduler('zzz', 2);
  }

  stopScheduler(name: string) {
    const scheduler = this.schedulerRegistry.getCronJob(name);
    scheduler.stop();
  }
  addScheduler(name: string, weeks) {
    // const scheduler = this.schedulerRegistry.getCronJob(name);
    // if (scheduler) {
    //   this.schedulerRegistry.deleteCronJob(name);
    // }
    const job = new CronJob(CronExpression.EVERY_10_SECONDS, () => {});
    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }
}
