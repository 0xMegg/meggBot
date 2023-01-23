import {
  ApplicationCommandOptionType,
  ChannelType,
  CommandInteraction,
  TextBasedChannel,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { AnnounceService } from "../services/AnnounceService";
import { injectable } from "tsyringe";
import { bot } from "../main";

@Discord()
@injectable()
export class Embed {
  constructor(private announceService: AnnounceService) {}

  @Slash({ description: "make embeded message" })
  async embed(
    @SlashOption({
      description: "title to embed",
      name: "title",
      type: ApplicationCommandOptionType.String,
    })
    title: string,
    @SlashOption({
      description: "link of image",
      name: "image",
      type: ApplicationCommandOptionType.String,
    })
    emageLink: string,
    @SlashOption({
      description:
        "원하는 시간을 yyyymmddttmm(2022년1월1일00시00분 -> 2022-01-01 00:00)로 입력하세요",
      name: "time",
      type: ApplicationCommandOptionType.String,
    })
    time: string,
    @SlashOption({
      description: "channel id for upload",
      name: "channelid",
      type: ApplicationCommandOptionType.String,
    })
    targetChannelId: string,
    interaction: CommandInteraction
  ) {
    console.log("start to run");
    let targetChannel = interaction.channel as TextBasedChannel;
    if (targetChannelId !== undefined && targetChannelId !== null) {
      targetChannel = bot.channels.cache.get(
        targetChannelId
      ) as TextBasedChannel;
    }
    const embedJson = (
      title: string,
      description: string,
      imageUrl: string
    ) => {
      return {
        embeds: [
          {
            title: title,
            description: description,
            color: 0x00ffff,
            image: {
              url: imageUrl,
            },
          },
        ],
      };
    };
    const target = new Date(time).getTime();
    const now = new Date().getTime();
    const limit = target - now;

    // console.log(`target : ${target}\nnow    : ${now}\nlimit is ${limit}`);

    const announceData = await this.announceService.read(interaction.user.id);

    if (announceData === null) {
      interaction.reply("저장된 데이터가 없습니다");
      return;
    }
    console.log("1");
    const messageId = announceData?.messageId;
    const channelId = announceData?.channelId;

    const foundChannel = bot.channels.cache.get(channelId);
    if (foundChannel === undefined) {
      interaction.reply("저장된 channelId가 올바르지 않습니다");
      return;
    }
    console.log("2");
    if (foundChannel.type !== ChannelType.GuildText) {
      interaction.reply("저장된 채널이 텍스트 기반 채널이 아닙니다");
      return;
    }
    console.log("3");
    const content = (await foundChannel?.messages.fetch(messageId)).content;
    if (content === null) {
      interaction.reply("저장된 문구가 없습니다");
      return;
    }
    console.log(`content is ${content}`);

    await interaction.deferReply();

    if (targetChannel === undefined) return;
    if (targetChannel.type !== ChannelType.GuildText) return;
    setTimeout(() => {
      targetChannel?.send(embedJson(title, content, emageLink));
      interaction.editReply("업로드 완료");
    }, limit);
  }
}

// "https://en.pimg.jp/047/504/268/1/47504268.jpg"
