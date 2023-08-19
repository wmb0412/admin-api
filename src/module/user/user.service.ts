import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { QueryUserDto } from './dto/read-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return this.UserRepository.save({
      ...rest,
      password: hash,
    });
  }

  async findAll(queryUser: QueryUserDto) {
    const { pageSize, pageNo } = queryUser;
    const limit = pageSize * (pageNo - 1);
    const list = await this.UserRepository.find({
      take: pageSize,
      skip: limit,
    });
    const total = await this.UserRepository.count();
    return {
      list,
      total,
      pageSize,
      pageNo,
    };
  }

  findOne(username: string) {
    return this.UserRepository.findOneBy({
      username,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
