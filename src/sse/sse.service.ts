import { Injectable } from '@nestjs/common';
import {Subject} from 'rxjs';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateSubscriptionDto} from "./dto/create-subscription.dto";
import {Subscription} from "./subscription.entity";
@Injectable()
export class SseService {
  constructor(
      @InjectRepository(Subscription)
      private readonly subscriptionRepo: Repository<Subscription>,
  ) {}

  private clients: Map<string, Subject<any>[]> = new Map();

  async subscribe(userId: string, nftId: string, eventTypes: string[]){
    // save the subscription to the database
    for (const event of eventTypes) {
      const dto: CreateSubscriptionDto = {
        userId,
        nftId,
        type: event,
      };
      if(!await this.subscriptionRepo.findOne({where: dto})) {
          const subscription = this.subscriptionRepo.create(dto);
          await this.subscriptionRepo.save(subscription);
      }
    }

   // establish a connection to the client
    const events$ = new Subject<any>();
    const arr = this.clients.get(userId) || [];
    arr.push(events$);
    this.clients.set(userId, arr);
    console.log("client sse",this.clients.get(userId));
    return events$;
  }

  publish(userId: string, payload: any) {
    const arr = this.clients.get(userId) || [];
    for (const subj of arr) subj.next(payload);
  }

  unsubscribe(userId: string, subject: Subject<any>) {
    const arr = this.clients.get(userId) || [];
    this.clients.set(userId, arr.filter(s => s !== subject));
  }
}