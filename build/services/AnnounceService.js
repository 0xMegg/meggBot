var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { singleton } from "tsyringe";
import { prisma } from "../database/prisma";
let AnnounceService = class AnnounceService {
    save(userId, messageId, channelId, guildId) {
        return prisma.savedChat.upsert({
            where: { creator: userId },
            update: {
                messageId: messageId,
                channelId: channelId,
                guildId: guildId,
            },
            create: {
                creator: userId,
                messageId: messageId,
                channelId: channelId,
                guildId: guildId,
            },
        });
    }
    read(userId) {
        return prisma.savedChat.findUnique({
            where: { creator: userId },
        });
    }
};
AnnounceService = __decorate([
    singleton()
], AnnounceService);
export { AnnounceService };
