import { $Enums, Prisma } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export type SubscribeCreateDto1 = Prisma.SubscribeCreateInput;

export enum SubscribeEnum {
  EMAIL = 'EMAIL',
  DINGDING = 'DINGDING',
}
export class SubscribeCreateDto {
  /**
   * 订阅标题
   */
  @IsString() title: string;
  /**
   * 订阅内容
   */
  @IsString() text: string;
  /**
   * 订阅类型
   */
  @IsEnum(SubscribeEnum) type: SubscribeEnum;
  /**
   * 订阅用户
   */
  users: string[];
}
