import "reflect-metadata";
import { dirname, importx } from "@discordx/importer";
import { Interaction, Message, Partials } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client, DIService, tsyringeDependencyRegistryEngine } from "discordx";
import { container } from "tsyringe";
import dotenv from "dotenv";

dotenv.config();

export const bot = new Client({
  // To use only guild command
  // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

  // Discord intents
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
  ],

  // Debug logs are disabled in silent mode
  silent: false,

  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: "!",
  },

  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

bot.once("ready", async () => {
  // Make sure all guilds are cached
  // await bot.guilds.fetch();

  // Synchronize applications commands with Discord
  await bot.initApplicationCommands();

  // To clear all guild commands, uncomment this line,
  // This is useful when moving from guild commands to global commands
  // It must only be executed once
  //
  //  await bot.clearApplicationCommands(
  //    ...bot.guilds.cache.map((g) => g.id)
  //  );

  console.log("Bot started");
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});

bot.on("messageReactionAdd", (reaction, user) => {
  bot.executeReaction(reaction, user);
});

async function run() {
  DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

  await importx(
    `${dirname(import.meta.url)}/{events,commands,reactions}/**/*.{ts,js}`
  );
  // Let's start the bot
  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  // Log in with your bot token
  await bot.login(process.env.BOT_TOKEN);
}

run();
