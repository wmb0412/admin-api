import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class filenamePipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    const pattern = /[\u4e00-\u9fa5]/;
    if (!pattern.test(value.originalname))
      value.originalname = Buffer.from(value.originalname, 'latin1').toString(
        'utf8',
      );
    return value;
  }
}
