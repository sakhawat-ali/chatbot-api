import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageSender } from './message-sender';
import { ChatSession } from './chat-session.entity';

@Entity('chat_messages')
@Index(['sessionId', 'createdAt'])
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'session_id' })
  sessionId: string;

  @Column({ type: 'enum', enum: MessageSender })
  sender: MessageSender;

  @Column({ type: 'varchar', length: 10000 })
  content: string;

  @Column({ type: 'varchar', length:50000, nullable: true })
  context: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ChatSession, (session) => session.messages, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'session_id' })
  session: ChatSession;
}
