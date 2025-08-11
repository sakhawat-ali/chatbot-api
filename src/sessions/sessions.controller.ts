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
  UseGuards,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionRequest } from './dto/create-session.dto';
import { GetSessionsRequest } from './dto/get-sessions.dto';
import { SessionResponse } from './dto/session-response.dto';
import { SessionsListResponse } from './dto/session-list-response.dto';
import { UpdateSessionRequest } from './dto/update-session-request.dto';
import { ApiKey } from 'src/common/decorator/api-key.decorator';
import { ApiKeyGuard } from 'src/common/guard/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('api/v1/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSession(
    @ApiKey() apiKey: string,
    @Body() req: CreateSessionRequest,
  ): Promise<SessionResponse> {
    const session = await this.sessionsService.createSession(apiKey,req);
    return session;
  }

  @Get()
  async getSessions(
    @ApiKey() apiKey: string,
    @Query() req: GetSessionsRequest
  ): Promise<SessionsListResponse> {
    const sessionList = await this.sessionsService.getSessions(apiKey,req);
    return sessionList;
  }

  @Get(':id')
  async getSessionById(
    @ApiKey() apiKey: string,
    @Param('id') id: string,
  ): Promise<SessionResponse> {
    const session = await this.sessionsService.getSessionById(id, apiKey);
    return session;
  }

  @Patch(':id')
  async updateSession(
    @Param('id') id: string,
    @ApiKey() apiKey: string,
    @Body() req: UpdateSessionRequest,
  ): Promise<SessionResponse> {
    const session = await this.sessionsService.updateSession(id, apiKey, req);
    return session;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteSession(@Param('id') id: string, @ApiKey() apiKey: string) {
    await this.sessionsService.deleteSession(id, apiKey);
  }
}
