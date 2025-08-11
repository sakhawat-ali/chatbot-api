import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageRequest } from './dto/create-message-request.dto';
import { MessageResponse } from './dto/message-response.dto';
import { MessagesListResponse } from './dto/messages-list-response.dto';
import { ChatMessage, ChatSession} from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageOrder, PaginationInfo } from './dto/pagination-info.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(ChatMessage)
    private messageRepo: Repository<ChatMessage>,
    @InjectRepository(ChatSession)
    private sessionRepo: Repository<ChatSession>,
  ) {}

  async createMessage(
    sessionId: string,
    apiKey: string,
    createMessage: CreateMessageRequest,
  ): Promise<MessageResponse> {
   
    this.validateSession(sessionId, apiKey);

    if (createMessage.content.trim().length === 0) {
      throw new BadRequestException(
        'Message content cannot be empty or only whitespace',
      );
    }

    const message = this.messageRepo.create({
      sessionId,
      sender: createMessage.sender,
      content: createMessage.content.trim(),
      context: createMessage.context?.trim() || null,
    });
    const saveMessage = await this.messageRepo.save(message);
    return { ...saveMessage, context: saveMessage.context || undefined };
  }

  async getMessages(
    sessionId: string,
    apiKey: string,
    paginationInfo: PaginationInfo,
  ): Promise<MessagesListResponse> {
    this.validateSession(sessionId, apiKey);
    const { page = 1, limit = 50, order = MessageOrder.ASC } = paginationInfo;

    const totalCount = await this.messageRepo.count({
      where: { sessionId },
    });

    const messages = await this.messageRepo.find({
      where: { sessionId },
      order: { createdAt: order },
      skip: (page - 1) * limit,
      take: limit,
    });

    const messagesDto = messages.map((m) => ({
      ...m,
      context: m.context || undefined,
    }));
    return {
      messages: messagesDto,
      totalCount,
      page,
      limit,
    };
  }

  async getMessageById(
    id: string,
    sessionId: string,
    apiKey: string,
  ): Promise<MessageResponse> {
    this.validateSession(sessionId, apiKey);

    const message = await this.messageRepo.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return { ...message, context: message?.context || undefined };
  }

  private async validateSession(sessionId: string, apiKey: string) {
    const isSessionExists = await this.sessionRepo.exists({
      where: { id: sessionId, apiKey },
    });

    if (!isSessionExists) {
      throw new NotFoundException('Session does not exists');
    }
  }
}
