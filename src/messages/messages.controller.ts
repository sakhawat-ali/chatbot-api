import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageResponse } from './dto/message-response.dto';
import { CreateMessageRequest } from './dto/create-message-request.dto';
import { ApiKey } from 'src/common/decorator/api-key.decorator';
import { MessagesListResponse } from './dto/messages-list-response.dto';
import { PaginationInfo } from './dto/pagination-info.dto';
import { ApiKeyGuard } from 'src/common/guard/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('api/vi/sessions/:sessionId/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMessage(
    @Param('sessionId') sessionId: string,
    @ApiKey() apiKey: string,
    @Body() req: CreateMessageRequest,
  ): Promise<MessageResponse> {
    return await this.messagesService.createMessage(sessionId, apiKey, req);
  }

  @Get()
  async getMessages(
    @Param('sessionId') sessionId: string,
    @ApiKey() apiKey: string,
    @Query() req: PaginationInfo,
  ): Promise<MessagesListResponse> {
    return await this.messagesService.getMessages(sessionId, apiKey, req);
  }

  @Get(':id')
  async getMessageById(
    @Param('sessionId') sessionId: string,
    @Param('id') id: string,
    @ApiKey() apiKey: string,
  ): Promise<MessageResponse> {
    return await this.messagesService.getMessageById(sessionId, id, apiKey);
  }
}
