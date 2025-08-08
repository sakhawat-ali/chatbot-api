import { MessageSender } from '../../entities/message-sender';

export class MessageResponse {
  id: string;
  sessionId: string;
  sender: MessageSender;
  content: string;
  context?: string;
  createdAt: Date;
  updatedAt: Date;
}
