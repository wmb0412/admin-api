import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from './entities/music.entity';
import { UPLOADS_DIR } from 'src/app.module';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private MusicRepository: Repository<Music>,
  ) {}
  async create(file: Express.Multer.File) {
    const name = file.originalname;
    const url = UPLOADS_DIR + '/music/' + name;
    const res = await this.MusicRepository.save({
      url,
      name,
    });
    return res;
  }

  async findAll(queryMusic) {
    const { pageSize, pageNo } = queryMusic;
    const limit = pageSize * (pageNo - 1);
    const list = await this.MusicRepository.find({
      take: pageSize,
      skip: limit,
    });
    const total = await this.MusicRepository.count();
    return {
      list,
      total,
      pageSize,
      pageNo,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} music`;
  }
}
