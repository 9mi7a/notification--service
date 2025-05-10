import {Controller, Get, Param, Post} from "@nestjs/common";
import {MessagingService} from "../messaging/messaging.service";
import {NotificationService} from "./notification.service";

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService:NotificationService) {}

    @Get("get-unread")
    async getUnreadNotifications(@Param("userId") userId: string) {
        return this.notificationService.findUnread(userId);
    }
    @Post("mark-read/:id")
    async markRead(@Param("id") id: string) {
        return this.notificationService.markRead(id);
    }
}