import { Injectable } from '@nestjs/common';
import { CreateMessageRequest } from './dto/create-message-request.dto';
import { MessageResponse } from './dto/message-response.dto';
import { GetMessagesRequest } from './dto/get-messages-request.dto';
import { MessagesListResponse } from './dto/messages-list-response.dto';
import { MessageSender } from 'src/entities';

@Injectable()
export class MessagesService {
  createMessage(
    sessionId: string,
    req: CreateMessageRequest,
    apiKey: string,
  ): MessageResponse {
    return {
      id: 'generated-id',
      sessionId: sessionId,
      sender: req.sender,
      content: req.content,
      context: req.context,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  getMessages(
    sessionId: string,
    req: GetMessagesRequest,
    apiKey: string,
  ): MessagesListResponse {
    return {
      messages: [],
      totalCount: 1,
      page: req.page || 1,
      limit: req.limit || 50,
    };
  }

  getMessageById(
    sessionId: string,
    id: string,
    apiKey: string,
  ): MessageResponse {
    return {
      id: id,
      sessionId: sessionId,
      sender: MessageSender.USER,
      content: '',
      context: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
