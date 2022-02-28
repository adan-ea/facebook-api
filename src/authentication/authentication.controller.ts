import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<{ user: User }> {
    return this.authenticationService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto): Promise<{ user: User; token: string }> {
    const user = await this.authenticationService.login(dto);
    return {
      user,
      token: this.authenticationService.generateAccessToken(user),
    };
  }
}
