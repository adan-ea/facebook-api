import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  register(dto: RegisterDto): Promise<{ user: User }> {
    return this.usersService.create(dto.email, dto.password);
  }

  async login({ email, password }: LoginDto): Promise<User> {
    const user = await this.usersService.findUnique({ email });
    if (!user || user.password !== password) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  generateAccessToken(user: User): string {
    const payload = { id: user.id };
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
}
