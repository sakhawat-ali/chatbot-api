import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatMessage } from './chat-message.entity';

@Index(['apiKey'])
@Index(['isFavorite'])
@Entity('chat_sessions')
export class ChatSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'api_key' })
  apiKey: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'boolean', default: false, name: 'is_favorite' })
  isFavorite: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ChatMessage, (message) => message.session, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  messages: ChatMessage[];
}