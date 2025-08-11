import { Injectable } from '@nestjs/common';
import { SessionResponse } from './dto/session-response.dto';
import { SessionsListResponse } from './dto/session-list-response.dto';
import { UpdateSessionRequest } from './dto/update-session-request.dto';
import { CreateSessionRequest } from './dto/create-session.dto';
import { GetSessionsRequest } from './dto/get-sessions.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatSession } from 'src/entities';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(ChatSession)
    private sessionRepo: Repository<ChatSession>,
  ) {}

  async createSession(
    apiKey: string,
    createSession: CreateSessionRequest,
  ): Promise<SessionResponse> {
    const title = createSession.title || this.generateAutoTitle();

    const session = this.sessionRepo.create({
      apiKey,
      title: title,
      isFavorite: false,
    });

    return await this.sessionRepo.save(session);
  }

  async getSessions(
    apiKey: string,
    getSession: GetSessionsRequest,
  ): Promise<SessionsListResponse> {
    const { favorite, page = 1, limit = 10 } = getSession;

    const where: FindOptionsWhere<ChatSession> = { apiKey };
    if (favorite !== undefined) {
      where.isFavorite = favorite;
    }

    const totalCount = await this.sessionRepo.count({ where });

    const sessions = await this.sessionRepo.find({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      sessions,
      totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async getSessionById(id: string, apiKey: string): Promise<SessionResponse> {
    const session = await this.sessionRepo.findOne({
      where: { id, apiKey },
    });

    if (!session) {
      throw new Error('Session not found');
    }
    return { ...session, messages: [] };
  }

  async updateSession(
    id: string,
    apiKey: string,
    updateSession: UpdateSessionRequest,
  ): Promise<SessionResponse> {
    const session = await this.getSessionById(id, apiKey);

    if (updateSession.title !== undefined) {
      if (!updateSession.title.trim()) {
        throw new Error('Session title cannot be empty');
      }
      session.title = updateSession.title.trim();
    }

    if (updateSession.isFavorite !== undefined) {
      session.isFavorite = updateSession.isFavorite;
    }

    return await this.sessionRepo.save(session);
  }

async deleteSession(id: string, apiKey: string): Promise<void> {
    const session = await this.getSessionById(id, apiKey);
    await this.sessionRepo.remove(session);
  }

  private generateAutoTitle(): string {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 16).replace('T', ' ');
    return `New Chat - ${dateStr}`;
  }
}
