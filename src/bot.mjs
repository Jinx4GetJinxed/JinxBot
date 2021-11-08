import { } from "dotenv/config"
import { Client, Intents, Collection } from "discord.js"
import { Gold, Hello } from './cmd_startwith.js'
import { kick_id, ban_id } from "./moderator_function.js"
import { bio, status } from "./statut.js";
import { Consignes1, Consignes2, Consignes3 } from './consignes_function.js';
import { partialMessage, roleAdd, roleRemove, msgAddReaction, msgRemoveReaction } from "./function_roles.js";
import { DisTube } from "distube"
import { SpotifyPlugin } from "@distube/spotify"
import { SoundCloudPlugin } from "@distube/soundcloud";

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
const PREFIX = "Jinx ";

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

    if (message.content.startsWith(config.prefix)) {
        const prefix2 = config.prefix
        if (!message.content.startsWith(prefix2)) return;
        const Args = message.content.slice(prefix2.length).trim().split(/ +/g)
        const command = Args.shift().toLowerCase()
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
        if (!cmd) return console.log("pas bien");
        if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send(`${client.emotes.error} | Tu dois être dans un canal vocal chacal!`)
        try {
            cmd.run(client, message, Args)
        } catch (e) {
            console.error(e)
            message.reply(`Erreur: ${e}`)
        }
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

const statut = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send(
        `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${statut(queue)}`
    ))
    .on("addSong", (queue, song) => queue.textChannel.send(
        `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("addList", (queue, playlist) => queue.textChannel.send(
        `${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${statut(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
    .on("error", (channel, e) => {
        channel.send(`${client.emotes.error} | An error encountered: ${e}`)
        console.error(e)
    })
    .on("empty", channel => channel.send("Voice channel is empty! Leaving the channel..."))
    .on("searchNoResult", message => message.channel.send(`${client.emotes.error} | No result found!`))
    .on("finish", queue => queue.textChannel.send("Finished!"))

client.login(process.env.DISCORDJS_BOT_TOKEN);
