/**
 * @author Id Brahim Hakim
 *
 * @import "dotenv/config"
 * @import "discord.js"
 */
import { } from "dotenv/config";
import { Client, Intents, Collection } from "discord.js";
/**
 * @import "../src/fonctions"
 */
import { Gold, Hello } from "./fonctions/cmd_startwith.js";
import { kick_id, ban_id, no_cmd, not_allowed_cmd, wrong_channel_cmd, wrong_channel_cmd1 } from "./fonctions/moderator_function.js";
import { bio, status } from "./fonctions/statut.js";
import { Consignes1, Consignes2, Consignes3, Consignes4, Consignes5 } from "./fonctions/consignes_function.js";
import { partialMessage, roleAdd, roleRemove, msgAddReaction, msgRemoveReaction } from "./fonctions/function_roles.js";
import { add_membre } from "./fonctions/ajout_membre.js";
import { supp_membre } from "./fonctions/supp_membre.js";
import { run_command } from "./fonctions/lecture_commands.js";
import { clear_command } from "./fonctions/clear_fonction.js";
/**
 * @import "distube"
 */
import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { message_distube } from "./message_distube.js/main_message.js";
/**
 * @import "../src/level"
 */
import { table_prep, create_table } from "./level/tables.js";
import { score_add, score_give, show_level, top_rank } from "./level/score.js";
/**
 * @import "module"
 * @import "./config.json"
 * @import "better-sqlite3"
 * @import "fs"
 */
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("./config.json");
const fs = require("fs");
/**
 * @constructor Client
 */
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

const PREFIX = "jinx!";

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
});
client.commands = new Collection();
client.aliases = new Collection();
client.emotes = config.emoji;
client.commands = new Collection();

fs.readdir("./src/commands/", (err, files) => {
  if (err) return console.log("Could not find any commands!");
  const jsFiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) return console.log("Could not find any commands!");
  jsFiles.forEach((file) => {
    const cmd = require(`./commands/${file}`);
    console.log(`chargé ${file}`);
    client.commands.set(cmd.name, cmd);
    if (cmd.aliases)
      cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
  });
});

client.on("ready", () => {
  setInterval(() => {
    var Description_Status = bio();
    client.user.setActivity(Description_Status.message, {
      type: Description_Status.type,
    });
  }, 10000);

  setInterval(() => {
    var type_status = status();
    client.user.setStatus(type_status);
  }, 15000);

  console.log(`le bot ${client.user.tag} est connecté`);

  const table = table_prep();
  if (!table["count(*)"]) {
    create_table();
  }
});

client.on("guildMemberAdd", async (member) => {
  add_membre(member, client);
});

client.on("guildMemberRemove", async (member) => {
  supp_membre(member, client);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  score_add(client, message, message.guild);

  const [CMD_NAME, ...args] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);

  switch (true) {
    case message.content.toLowerCase().startsWith(PREFIX):
      setTimeout(() => message.delete(), 1000);
      switch (CMD_NAME) {
        case "consignes":
          if (message.member.permissions.has("ADMINISTRATOR")) {
            if (message.channel.id === "481477520236216350") {
              Consignes1(message);
              Consignes2(message);
              Consignes3(message);
              Consignes4(message);
              Consignes5(message);
            }
          } else {
            not_allowed_cmd(message, client.emotes.error);
          }
          break;

        case "dégage-moi":
          if (message.member.permissions.has("ADMINISTRATOR")) {
            kick_id(message, args);
          } else {
            not_allowed_cmd(message, client.emotes.error);
          }
          break;

        case "ban-moi":
          if (message.member.permissions.has("ADMINISTRATOR")) {
            ban_id(message, args);
          } else {
            not_allowed_cmd(message, client.emotes.error);
          }
          break;

        case "level":
          if (message.channel.id === "833824151671930920") {
            show_level(client, message);
          } else {
            wrong_channel_cmd1(message, client.emotes.error);
          }
          break;

        case "give":
          if (message.member.permissions.has("ADMINISTRATOR")) {
            if (message.channel.id === "833824151671930920") {
              score_give(message, client, args);
            } else {
              wrong_channel_cmd1(message, client.emotes.error);
            }
          } else {
            not_allowed_cmd(message, client.emotes.error);
          }
          break;
        case "rank": case "top":
          if (message.channel.id === "833824151671930920") {
            top_rank(message.channel.id, message, client, client.emotes.error, message.guild);
          } else {
            wrong_channel_cmd1(message, client.emotes.error);
          }
          break;

        case "clear": case "c":
          setTimeout(() => clear_command(message, args[0]), 2000);
          break

        default:
          no_cmd(message, client.emotes.error);
          break;
      }
      break;

    case message.content.toLowerCase().startsWith(config.prefix):
      setTimeout(() => message.delete(), 1000);
      if (message.channel.id === "474553482691608597") {
        run_command(
          message,
          config.prefix,
          client.commands,
          client.aliases,
          client.emotes.error,
          client, 
          client.distube
        );
      } else {
        wrong_channel_cmd(message, client.emotes.error);
      }
      break;

    case message.content.toLowerCase().includes("gold"):
      Gold(message);
      break;

    case message.content.toLowerCase().includes("hello"):
      Hello(message);
      break;
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  partialMessage(reaction);
  msgAddReaction(reaction);
  if (reaction.message.channel.id === "481477520236216350") {
    roleAdd(reaction, user);
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  partialMessage(reaction);
  msgRemoveReaction(reaction);
  if (reaction.message.channel.id === "481477520236216350") {
    roleRemove(reaction, user);
  }
});

message_distube(client.distube, client.emotes);

client.login(process.env.DISCORDJS_BOT_TOKEN);
