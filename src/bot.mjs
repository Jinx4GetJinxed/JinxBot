import { } from "dotenv/config"
import { Client, Intents, Collection } from "discord.js"
import { Gold, Hello } from './cmd_startwith.js'
import { kick_id, ban_id } from "./moderator_function.js"
import { bio, status } from "./statut.js";
import { Consignes1, Consignes2, Consignes3, Consignes4, Consignes5 } from './consignes_function.js';
import { partialMessage, roleAdd, roleRemove, msgAddReaction, msgRemoveReaction } from "./function_roles.js";
import { DisTube } from "distube"
import { SpotifyPlugin } from "@distube/spotify"
import { SoundCloudPlugin } from "@distube/soundcloud";
import { randomColor } from "./random_color.js"

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
const PREFIX = "Jinx!";

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()]
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
    }, 10000);

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
            setTimeout(() => message.delete(), 1000);
            if (message.member.permissions.has("ADMINISTRATOR")) {
                if (message.channel.id === "481477520236216350") {
                    Consignes1(message);
                    Consignes2(message);
                    Consignes3(message);
                    Consignes4(message)
                    Consignes5(message)
                } else {
                    message.reply("**Tu dois utiliser la commande dans le channel approprié !** ***FDP***").then(msg => { setTimeout(() => msg.delete(), 5000) })
                }
            } else {
                message.reply("**Tu n'as pas le droit d'utiliser cette commande !** ***BG***").then(msg => { setTimeout(() => msg.delete(), 5000) });
            }
        }
    }

    if (message.content.startsWith(config.prefix)) {
        setTimeout(() => message.delete(), 1000);
        if (message.channel.id === "474553482691608597") {
            const prefix1 = config.prefix
            if (!message.content.toLowerCase().startsWith(prefix1)) return;
            const Args = message.content.slice(prefix1.length).trim().split(/ +/g)
            const command = Args.shift().toLowerCase()
            const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
            if (!cmd) return message.reply({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n'Certes tu demandes mes services, mais tu me demandes une commande qui n'existe pas'"\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
            if (cmd.inVoiceChannel && !message.member.voice.channel) return message.reply({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.error} | 'Tu dois être dans un canal vocal, chacal!'\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
            try {
                cmd.run(client, message, Args)
            } catch (e) {
                console.error(e)
                message.reply(`Erreur: ${e}`)
            }
        } else {
            message.reply({
                embeds: [{
                    color: randomColor(),
                    description: `${client.emotes.error} | Tu dois utiliser cette commande dans le channel <#474553482691608597> !`
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
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
const statut = queue => `Volume: \`${queue.volume}%\` | Filtre: \`${queue.filters.join(", ") || "Non"}\` | Boucle: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Toute la file d'attente" : "Cette Musique" : "Non"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({
        embeds: [{
            color: randomColor(),
            description: `\`\`\`xl\n${client.emotes.play} | 'Lecture:'\`\`\` \`${song.name}\` - \`${song.formattedDuration}\``
        }]
    })
    )
    .on("addSong", (queue, song) => queue.textChannel.send({
        embeds: [{
            color: randomColor(),
            description: `\`\`\`xl\n${client.emotes.success} | 'Ajout de la musique:'\`\`\` \`${song.name}\` - \`${song.formattedDuration}\` à la file d'attente par ${song.user}\n${statut(queue)}`
        }]
    })
    )
    .on("addList", (queue, playlist) => queue.textChannel.send({
        embeds: [{
            color: randomColor(),
            description: `\`\`\`xl\n${client.emotes.success} | 'Ajout de la playlist:'\`\`\` \`${playlist.name}\` (${playlist.songs.length} musiques) à la file d'attente\n${statut(queue)}`
        }]
    })
    )
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send({
            embeds: [{
                color: randomColor(),
                description: `\`\`\`xl\n'Choisissez une option parmi les suivantes'\`\`\`\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\`\`\`xl\n'Entrez autre chose ou attendez 60 secondes pour annuler'\`\`\``
            }]
        })
    }
    )
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send({
        embeds: [{
            color: randomColor(),
            description: `\`\`\`xl\n${client.emotes.error} | Searching canceled\`\`\``
        }]
    })
    )
    .on("error", (channel, e) => {
        channel.send({
            embeds: [{
                color: randomColor(),
                description: `\`\`\`xl\n${client.emotes.error} | 'Une erreur a été rencontrée:' ${e}\`\`\``
            }]
        })
        console.error(e)
    }
    )
    .on("empty", channel => channel.send({
        embeds: [{
            color: randomColor(),
            description: `\`\`\`xl\nLe canal vocal est vide ! Je quitte le canal...\`\`\``
        }]
    })
    )
    .on("searchNoResult", message => message.channel.send({
        embeds: [{
            color: randomColor(),
            description: `\`\`\`xl\n${client.emotes.error} | Aucun résultat trouvé !\`\`\``
        }]
    })
    )
    .on("finish", queue => queue.textChannel.send({
        embeds: [{
            color: randomColor(),
            description: `\`\`\`xl\n'Terminé!'\`\`\``
        }]
    })
    )

client.login(process.env.DISCORDJS_BOT_TOKEN);
