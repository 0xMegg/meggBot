import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
export class Test {
  @Slash({ description: "test" })
  test(interaction: CommandInteraction) {
    interaction.reply("success");
  }
}
