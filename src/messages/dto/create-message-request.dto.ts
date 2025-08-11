import {
  IsEnum,
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MessageSender } from '../../entities/message-sender';

export class CreateMessageRequest {
  @IsEnum(MessageSender, {
    message: 'Sender must be either "user" or "assistant"',
  })
  sender: MessageSender;

  @IsString()
  @MinLength(1, { message: 'Content cannot be empty' })
  @MaxLength(10000, { message: 'Content cannot exceed 10,000 characters' })
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(50000, { message: 'Context cannot exceed 50,000 characters' })
  context?: string;
}
