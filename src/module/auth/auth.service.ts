import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto, SignInAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import {
  userAlreadyExited,
  userPasswordError,
} from 'src/common/constant/error.constant';
import { ErrorExceptionFilter } from 'src/filter/ErrorExceptionFilter';

@Injectable()
export class AuthService {
  constructor(private UserService: UserService) {}
  async create(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;
    const user = await this.UserService.findOne(username);
    if (user) {
      throw new ErrorExceptionFilter(userAlreadyExited);
    }
    const createUser = await this.UserService.create({
      username,
      password,
    });
    return createUser;
  }
  async signIn(signInAuthDto: SignInAuthDto) {
    const { username, password } = signInAuthDto;
    const user = await this.UserService.findOne(username);
    const { password: ps, ...rest } = user || {};
    if (password === ps) {
      return rest;
    }
    throw new ErrorExceptionFilter(userPasswordError);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
