import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ErrorResult } from 'src/common/constant/error.constant';
import { BizHttpException } from 'src/common/filter/BizHttpException';

@Injectable()
export class validatePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);
    if (errors.length) {
      const firstErrorMessage = Object.values(errors[0].constraints)[0];
      throw new BizHttpException(
        ErrorResult.getData(firstErrorMessage || ErrorResult.INVALID_PARAMS),
      );
    }
    return value;
  }
}
