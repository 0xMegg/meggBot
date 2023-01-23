var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { MessageReaction, User } from "discord.js";
import { Discord, Reaction } from "discordx";
import { AnnounceService } from "../services/AnnounceService";
import { injectable } from "tsyringe";
let Collect = class Collect {
    announceService;
    constructor(announceService) {
        this.announceService = announceService;
    }
    async collect(reaction, user) {
        //clicker
        const clicker = user.id;
        const messageId = reaction.message.id;
        const channelId = reaction.message.channelId;
        await this.announceService.save(clicker, messageId, channelId);
    }
};
__decorate([
    Reaction({ emoji: "📌" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MessageReaction, User]),
    __metadata("design:returntype", Promise)
], Collect.prototype, "collect", null);
Collect = __decorate([
    Discord(),
    injectable(),
    __metadata("design:paramtypes", [AnnounceService])
], Collect);
export { Collect };
