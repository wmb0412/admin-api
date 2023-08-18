import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    // return 'This action adds a new user';
    return this.UserRepository.save(createUserDto);
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
