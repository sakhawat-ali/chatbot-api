# Chatbot API

A NestJS-based REST API for managing chat sessions and messages with PostgreSQL database.

## Setup

### Using Docker
```bash
docker-compose build
docker-compose up
docker-compose down
```

### Local Development
```bash
# Install dependencies
npm install

# Start PostgreSQL database
# Configure environment variables (see docker-compose.yml)

# Generate migrations
npm run mig:gen

# Run migrations
npm run mig:run

# Start development server
npm run start:dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

All endpoints require an API key header: `X-API-Key: your-api-key`

### Sessions
- `POST /api/v1/sessions` - Create a new chat session
- `GET /api/v1/sessions` - List all sessions (with pagination)
- `GET /api/v1/sessions/:id` - Get session details
- `PATCH /api/v1/sessions/:id` - Update session
- `DELETE /api/v1/sessions/:id` - Delete session

### Messages
- `POST /api/v1/sessions/:sessionId/messages` - Send a message
- `GET /api/v1/sessions/:sessionId/messages` - Get session messages (with pagination)

## Configuration

Default API keys: `test-key-1`, `test-key-2`, `test-key-3`

Rate limiting: 10 requests per minute per API key
