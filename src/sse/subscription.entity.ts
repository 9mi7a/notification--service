import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column() userId: string;
    @Column() nftId: string;
    @Column() type: string;
    @CreateDateColumn() createdAt: Date;
}