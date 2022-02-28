import {Body, Controller, Delete, Get, Param, Patch, UseGuards} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Post, Profile } from '@prisma/client';
import { JwtGuard } from '../authentication/guards/jwt.guard';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@UseGuards(JwtGuard)
@Controller('/users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/posts')
  findAllPosts(@Param('id') id: string): Promise<{ posts: Post[] }> {
    return this.usersService.findAllPosts(id);
  }

  @Get(':id/profile')
  findProfile(@Param('id') id: string): Promise<{ profile: Profile }> {
    return this.usersService.findProfile(id);
  }

  @Patch(':id/profile')
  updateProfile(
    @Param('id') id: string,
    @Body() data: UpdateProfileDto,
  ): Promise<{ profile: Profile }> {
    return this.usersService.updateProfile(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
