import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty()
  @IsString()
  message?: string;
}
