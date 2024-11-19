import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { Response } from 'express';
import { CreateAuthDto, SignInAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { ErrorResult } from 'src/common/constant/error.constant';
import { BizHttpException } from 'src/common/filter/BizHttpException';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constant/jwt.constant';
import { CaptchaService } from 'src/common/services/captcha.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly captchaService: CaptchaService,
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
    const { username, password, captchaId, captchaText } = signInAuthDto;
    const captchaValidate = await this.captchaService.validateCaptcha(
      captchaId,
      captchaText,
    );
    if (!captchaValidate) {
      throw new BizHttpException(ErrorResult.INVALID_CAPTCHA);
    }
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new BizHttpException(ErrorResult.USER_PASSWORD_ERROR);
    }
    const { password: ps, ...rest } = user || {};
    if (!compareSync(password, ps)) {
      throw new BizHttpException(ErrorResult.USER_PASSWORD_ERROR);
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
