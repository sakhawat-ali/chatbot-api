import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageResponse } from './dto/message-response.dto';
import { CreateMessageRequest } from './dto/create-message-request.dto';
import { GetMessagesRequest } from './dto/get-messages-request.dto';
import { ApiKey } from 'src/common/decorator/api-key.decorator';
import { MessagesListResponse } from './dto/messages-list-response.dto';

@Controller('api/vi/sessions/:sessionId/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createMessage(
    @Param('sessionId') sessionId: string,
    @Body() req: CreateMessageRequest,
    @ApiKey() apiKey: string,
  ): MessageResponse {
    return this.messagesService.createMessage(sessionId, req, apiKey);
  }

  @Get()
  getMessages(
    @Param('sessionId') sessionId: string,
    @Query() req: GetMessagesRequest,
    @ApiKey() apiKey: string,
  ): MessagesListResponse {
    return this.messagesService.getMessages(sessionId, req, apiKey);
  }

  @Get(':id')
  getMessageById(
    @Param('sessionId') sessionId: string,
    @Param('id') id: string,
    @ApiKey() apiKey: string,
  ): MessageResponse {
    return this.messagesService.getMessageById(sessionId, id, apiKey);
  }
}
