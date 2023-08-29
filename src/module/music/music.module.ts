import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { UPLOADS_DIR } from 'src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Music]),
    MulterModule.register({
      // dest: './uploads',
      storage: diskStorage({
        // destination: './uploads',
        destination: (req, file, cb) => {
          const folderPath = UPLOADS_DIR + '/music/';

          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
          }
          cb(null, folderPath);
        },
        filename: (req, file, cb) => {
          file.originalname = Buffer.from(file.originalname, 'latin1').toString(
            'utf8',
          );
          cb(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
