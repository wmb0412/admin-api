import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { QueryUserDto } from './dto/read-user.dto';
import { ErrorExceptionFilter } from 'src/common/filter/ErrorExceptionFilter';
import { userAlreadyExited } from 'src/common/constant/error.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, username, ...rest } = createUserDto;
    const user = await this.findOne(username);
    if (user) {
      throw new ErrorExceptionFilter(userAlreadyExited);
    }
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return this.UserRepository.save({
      ...rest,
      username,
      password: hash,
    });
  }

  async findAll(queryUser: QueryUserDto) {
    const { pageSize, pageNo } = queryUser;
    const limit = pageSize * (pageNo - 1);
    const list = await this.UserRepository.find({
      take: pageSize,
      skip: limit,
      order: { created_at: 'DESC' },
    });
    const total = await this.UserRepository.count();
    return {
      list,
      total,
      pageSize,
      pageNo,
    };
  }

  async findOne(username: string) {
    // return this.UserRepository.findOneBy({ username });
    // return this.UserRepository.findOne({
    //   select: ['id', 'username', 'password'],
    //   where: { username },
    // });
    return this.UserRepository.createQueryBuilder()
      .select('*')
      .where('username=:username', { username })
      .getRawOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    return this.UserRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    this.UserRepository.delete(id);
    return;
  }
}
