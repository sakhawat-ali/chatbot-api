import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionRequest } from './dto/create-session.dto';
import { GetSessionsRequest } from './dto/get-sessions.dto';
import { SessionResponse } from './dto/session-response.dto';
import { SessionsListResponse } from './dto/session-list-response.dto';
import { UpdateSessionRequest } from './dto/update-session-request.dto';
import { ApiKey } from 'src/common/decorator/api-key.decorator';

@Controller('api/v1/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createSession(
    @Body() req: CreateSessionRequest,
    @ApiKey() apiKey: string,
  ): SessionResponse {
    return this.sessionsService.createSession(req, apiKey);
  }

  @Get()
  getSessions(
    @Query() req: GetSessionsRequest,
    @ApiKey() apiKey: string,
  ): SessionsListResponse {
    return this.sessionsService.getSessions(req, apiKey);
  }

  @Get(':id')
  getSessionById(
    @Param('id') id: string,
    @ApiKey() apiKey: string,
  ): SessionResponse {
    return this.sessionsService.getSessionById(id, apiKey);
  }

  @Patch(':id')
  updateSession(
    @Param('id') id: string,
    @Body() req: UpdateSessionRequest,
    @ApiKey() apiKey: string,
  ): SessionResponse {
    return this.sessionsService.updateSession(id, req, apiKey);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteSession(@Param('id') id: string, @ApiKey() apiKey: string): void {
    this.sessionsService.deleteSession(id, apiKey);
  }
}
