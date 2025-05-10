import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() userId: string;
  @Column() type: string;
  @Column() message: string;
  @Column({ default: false }) read: boolean;
  @CreateDateColumn() createdAt: Date;
}