import { MessageResponse } from './message-response.dto';

export class MessagesListResponse {
  messages: MessageResponse[];
  totalCount: number;
  page: number;
  limit: number;
}
