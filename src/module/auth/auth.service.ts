import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { Response } from 'express';
import { CreateAuthDto, SignInAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { userPasswordError } from 'src/common/constant/error.constant';
import { ErrorExceptionFilter } from 'src/common/filter/ErrorExceptionFilter';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constant/jwt.constant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;

    const createUser = await this.userService.create({
      username,
      password,
    });
    return createUser;
  }
  async signIn(signInAuthDto: SignInAuthDto, res?: Response) {
    const { username, password } = signInAuthDto;
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new ErrorExceptionFilter(userPasswordError);
    }
    const { password: ps, ...rest } = user || {};
    if (!compareSync(password, ps)) {
      throw new ErrorExceptionFilter(userPasswordError);
    }
    const payload = { id: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);
    res.cookie(
      jwtConstants.cookie_key,
      `${jwtConstants.token_type} ${access_token}`,
      {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
      },
    );
    return rest;
  }
  signOut(res?: Response) {
    res.cookie(jwtConstants.cookie_key, '', {});
    return '';
  }
  logout() {
    return '';
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
