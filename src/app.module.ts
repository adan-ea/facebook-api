import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthenticationModule, UsersModule, PostsModule],
})
export class AppModule {}
