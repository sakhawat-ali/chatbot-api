import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSessionRequest {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @MinLength(1, { message: 'Title cannot be empty' })
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title?: string;
}
