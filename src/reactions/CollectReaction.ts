import { MessageReaction, User } from "discord.js";
import { Discord, Reaction } from "discordx";
import { AnnounceService } from "../services/AnnounceService";
import { injectable } from "tsyringe";

@Discord()
@injectable()
export class Collect {
  constructor(private announceService: AnnounceService) {}

  @Reaction({ emoji: "📌" })
  async collect(reaction: MessageReaction, user: User): Promise<void> {
    //clicker
    const clicker = user.id;

    const messageId = reaction.message.id;
    const channelId = reaction.message.channelId;
    const guildId = reaction.message.guildId;

    if (guildId === null) return;
    await this.announceService.save(clicker, messageId, channelId, guildId);
  }
}
