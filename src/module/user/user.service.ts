import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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

  findAll() {
    return this.UserRepository.find();
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
