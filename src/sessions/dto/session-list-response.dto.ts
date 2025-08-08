import { SessionResponse } from './session-response.dto';

export class SessionsListResponse {
  sessions: SessionResponse[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}
