import { } from "dotenv/config"
import { Client, Intents, Collection } from "discord.js"
import { Gold, Hello } from './cmd_startwith.js'
import { kick_id, ban_id } from"./moderator_function.js"
import { bio, status } from "./statut.js";
import { Consignes1, Consignes2, Consignes3 }  from './consignes_function.js';
import { partialMessage,roleAdd,roleRemove,msgAddReaction,msgRemoveReaction } from "./function_roles.js";
import { DisTube } from "distube"
import { SpotifyPlugin } from "@distube/spotify"

import { createRequire } from "module"; 
const require = createRequire(import.meta.url); 
const config = require("./config.json") 

const fs = require('fs')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    plugins: [new SpotifyPlugin()]
})
client.commands = new Collection()
client.aliases = new Collection()
client.emotes = config.emoji;

client.commands = new Collection();

fs.readdir("./src/commands/", (err, files) => {
    if (err) return console.log("Could not find any commands!")
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})
const PREFIX = "Jinx ";

client.on("ready", () => {
    setInterval(() => {
        var Description_Status = bio();
        client.user.setActivity(Description_Status.message, {
            type: Description_Status.type
        });
    }, 5000);

    setInterval(() => {
        var type_status = status();
        client.user.setStatus(type_status);
    }, 15000);

    console.log(`le bot ${client.user.tag} est connecté`);
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

    if (message.content.startsWith(PREFIX)) {
        /** Fonction pour kick */
        if (CMD_NAME === "dégage-moi") {
            kick_id(message, args);
        } else if (CMD_NAME === "ban-moi") {
            ban_id(message, args);
        }

        /** Fonction pour afficher les consignes */
        if (CMD_NAME === "consignes") {
            if (message.member.permissions.has("ADMINISTRATOR")) {
                setTimeout(() => message.delete(), 1000);
                Consignes1(message);
                Consignes2(message);
                Consignes3(message);
            }
        }
    }

    const prefix2 = config.prefix
    if (!message.content.startsWith(prefix2)) return
    const command = args.shift()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send(`${client.emotes.error} | Tu dois être dans un canal vocal chacal!`)
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
        message.reply(`Erreur: ${e}`)
    }

    if (message.content.toLowerCase().includes("gold")) {
        Gold(message);
    }

    if (message.content.toLowerCase().includes("hello")) {
        Hello(message);
    }
});

client.on("messageReactionAdd", async (reaction, user) => {
    partialMessage(reaction);
    msgAddReaction(reaction);

    roleAdd(reaction, user);
});

client.on("messageReactionRemove", async (reaction, user) => {
    partialMessage(reaction);
    msgRemoveReaction(reaction);

    roleRemove(reaction, user);
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
