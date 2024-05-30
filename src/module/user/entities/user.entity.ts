import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ default: 'zhangsan' })
  @Column()
  username: string;
  @ApiProperty()
  @Column({ select: false })
  password: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  update_at: Date;
}
