import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { queryMusicDto } from './music.dto';
import { filenamePipe } from 'src/common/pipe/fileName.pipe';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(filenamePipe)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.musicService.create(file);
  }

  @Post('list')
  findAll(@Body() queryUser: queryMusicDto) {
    return this.musicService.findAll(queryUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(+id);
  }
}
