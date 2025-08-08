import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionsModule } from './sessions/sessions.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [SessionsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
