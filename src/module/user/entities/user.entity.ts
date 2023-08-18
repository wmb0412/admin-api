import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ default: 'zhangsan' })
  @Column()
  username: string;
  @ApiProperty()
  @Column()
  password: string;
}
