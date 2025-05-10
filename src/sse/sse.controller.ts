import {SseService} from "./sse.service";
import {Body, Controller, Post, Sse} from "@nestjs/common";
import {map, tap} from "rxjs";

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

    @Post('subscribe')
    @Sse() async subscribeToEvents(
        @Body() payload: {
            userId: string;
            nftId: string;
            events: string;
        }
    ): Promise<any> {
      const {userId, nftId, events: eventsParam} = payload;
      const eventTypes = eventsParam.split(',');
      const stream$ = await this.sseService.subscribe(userId, nftId, eventTypes);

      return stream$.pipe(
          map(data => ({data})),
          tap({
            unsubscribe: () => {
              this.sseService.unsubscribe(userId,  stream$);
            },
          })
     );
    // console.log('subscribeToEvents', userId, nftId, eventsParam);
  }

}
