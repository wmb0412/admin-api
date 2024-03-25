import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demo } from './entities/demo.entity';

@Injectable()
export class DemoService {
  constructor(
    @InjectRepository(Demo)
    private DemoRepository: Repository<Demo>,
  ) {}
  async findAll() {
    return this.DemoRepository.find();
  }
}
