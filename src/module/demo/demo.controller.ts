import { Controller, Get, Post } from '@nestjs/common';
import { DemoService } from './demo.service';
import { ErrorExceptionFilter } from 'src/filter/ErrorExceptionFilter';
import { CommonError } from 'src/common/constant/error.constant';

@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}
  @Get('get')
  find() {
    return this.demoService.findAll();
  }

  @Post('error')
  error() {
    throw new ErrorExceptionFilter(CommonError);
  }
}
