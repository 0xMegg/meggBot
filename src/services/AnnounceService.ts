import { PrismaPromise, SavedChat } from "@prisma/client";
import { singleton } from "tsyringe";
import { prisma } from "../database/prisma";

@singleton()
export class AnnounceService {
  save(
    userId: string,
    messageId: string,
    channelId: string,
    guildId: string
  ): PrismaPromise<SavedChat> {
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

  read(userId: string) {
    return prisma.savedChat.findUnique({
      where: { creator: userId },
    });
  }
}
