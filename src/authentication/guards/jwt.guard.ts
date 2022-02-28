import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization: token } = request.headers;
    if (!token) return false;

   //const payload = jwt.verify(token, process.env.JWT_SECRET);
   //request.userId = payload['id'];
    return true;
  }
}
