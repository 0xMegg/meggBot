var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ApplicationCommandOptionType, ChannelType, CommandInteraction, } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { AnnounceService } from "../services/AnnounceService";
import { injectable } from "tsyringe";
import { bot } from "../main";
let Embed = class Embed {
    announceService;
    constructor(announceService) {
        this.announceService = announceService;
    }
    async embed(title, emageLink, time, targetChannelId, interaction) {
        let targetChannel = interaction.channel;
        if (targetChannelId !== undefined && targetChannelId !== null) {
            targetChannel = bot.channels.cache.get(targetChannelId);
        }
        const embedJson = (title, description, imageUrl) => {
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
        if (announceData === null)
            return;
        const messageId = announceData?.messageId;
        const channelId = announceData?.channelId;
        const foundChannel = bot.channels.cache.get(channelId);
        if (foundChannel === undefined)
            return;
        if (foundChannel.type !== ChannelType.GuildText)
            return;
        const content = (await foundChannel?.messages.fetch(messageId)).content;
        console.log(`content is ${content}`);
        await interaction.deferReply();
        if (targetChannel === undefined)
            return;
        if (targetChannel.type !== ChannelType.GuildText)
            return;
        setTimeout(() => {
            targetChannel?.send(embedJson(title, content, emageLink));
            interaction.editReply("업로드 완료");
        }, limit);
    }
};
__decorate([
    Slash({ description: "make embeded message" }),
    __param(0, SlashOption({
        description: "title to embed",
        name: "title",
        type: ApplicationCommandOptionType.String,
    })),
    __param(1, SlashOption({
        description: "link of image",
        name: "image",
        type: ApplicationCommandOptionType.String,
    })),
    __param(2, SlashOption({
        description: "원하는 시간을 yyyymmddttmm(2022년1월1일00시00분 -> 2022-01-01 00:00)로 입력하세요",
        name: "time",
        type: ApplicationCommandOptionType.String,
    })),
    __param(3, SlashOption({
        description: "channel id for upload",
        name: "channelid",
        type: ApplicationCommandOptionType.String,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, CommandInteraction]),
    __metadata("design:returntype", Promise)
], Embed.prototype, "embed", null);
Embed = __decorate([
    Discord(),
    injectable(),
    __metadata("design:paramtypes", [AnnounceService])
], Embed);
export { Embed };
// "https://en.pimg.jp/047/504/268/1/47504268.jpg"
