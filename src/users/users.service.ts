import { Injectable } from '@nestjs/common';
import { Post, Prisma, Profile, User } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findUnique(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({ where });
  }

  async create(email: string, password: string): Promise<{ user: User }> {
    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        Profile: { create: { firstName: '', lastName: '' } },
      },
    });

    return { user };
  }

  async findAllPosts(id: string): Promise<{ posts: Post[] }> {
    const posts = await this.prisma.post.findMany({
      where: {
        authorId: id,
      },
    });

    return { posts };
  }

  async findProfile(id: string): Promise<{ profile: Profile }> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId: id,
      },
    });

    return { profile };
  }

  async updateProfile(
    id: string,
    dto: UpdateProfileDto,
  ): Promise<{ profile: Profile }> {
    const profile = await this.prisma.profile.update({
      where: {
        userId: id,
      },
      data: dto,
    });

    return { profile };
  }

  async delete(id): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
