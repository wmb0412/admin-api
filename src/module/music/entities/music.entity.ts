import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  name: string;
}
