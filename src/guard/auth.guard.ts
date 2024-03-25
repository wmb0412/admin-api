import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Unauthorized } from 'src/common/constant/error.constant';
import { jwtConstants } from 'src/common/constant/jwt.constant';
import { PUBLIC_KEY } from 'src/decorator/public.decorator';
import { ErrorExceptionFilter } from 'src/filter/ErrorExceptionFilter';

@Injectable()
export class AuthGuard implements CanActivate {
  jwtService = new JwtService();
  reflector = new Reflector();
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const isPublics = this.reflector.getAll(PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);
    if (isPublics.includes(true)) return true;
    const token = this.getTokenByRequest(request);
    if (!token) throw new ErrorExceptionFilter(Unauthorized);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch (error) {
      throw new ErrorExceptionFilter(Unauthorized);
    }
    return true;
  }
  private getTokenByRequest(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === jwtConstants.token_type ? token : undefined;
  }
}
