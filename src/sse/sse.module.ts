import { Module } from '@nestjs/common';
import { SseService } from './sse.service';
import { SseController } from './sse.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Subscription} from "./subscription.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  controllers: [SseController],
  providers: [SseService],
  exports: [SseService],
})
export class SseModule {}