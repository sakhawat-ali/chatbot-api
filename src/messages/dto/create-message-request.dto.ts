import { MessageSender } from 'src/entities';

export class CreateMessageRequest {
  sender: MessageSender;
  content: string;
  context?: string;
}
