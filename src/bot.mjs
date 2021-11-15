import { } from "dotenv/config"
import { Client, Intents, Collection, MessageEmbed } from "discord.js"
import { Gold, Hello } from './fonctions/cmd_startwith.js'
import { kick_id, ban_id } from "./fonctions/moderator_function.js"
import { bio, status } from "./fonctions/statut.js";
import { Consignes1, Consignes2, Consignes3, Consignes4, Consignes5 } from './fonctions/consignes_function.js';
import { partialMessage, roleAdd, roleRemove, msgAddReaction, msgRemoveReaction } from "./fonctions/function_roles.js";
import { DisTube } from "distube"
import { SpotifyPlugin } from "@distube/spotify"
import { SoundCloudPlugin } from "@distube/soundcloud";
import { randomColor } from "./fonctions/random_color.js"
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const config = require("./config.json")
const SQLite = require("better-sqlite3");
const sql = new SQLite("./scores.sqlite");

const fs = require('fs')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES
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
    const table = sql
        .prepare(
            "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';"
        )
        .get();
    if (!table["count(*)"]) {
        // If the table isn't there, create it and setup the database correctly.
        sql
            .prepare(
                "CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);"
            )
            .run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    // And then we have two prepared statements to get and set the score data.
    client.getScore = sql.prepare(
        "SELECT * FROM scores WHERE user = ? AND guild = ?"
    );
    client.setScore = sql.prepare(
        "INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);"
    );
});

client.on("guildMemberAdd", async member => {
    const Welcome = member.guild.channels.cache.get('456861351835336716')

    const embed = new MessageEmbed()
        .setColor(randomColor())
        .setAuthor("\\✧\\ 𝙹𝚒𝚗𝚡 /✧/ te souhaite aussi la bienvenue", client.user.avatarURL({ dynamic: true }))
        .setTitle(`\`${member.user.tag}\`, tu fais désormais parti(e) de \`${member.guild.name}\``)
        .setDescription(`\`\`\`xl\n'Si tu veux avoir accès à tous les channels:'\`\`\`<a:Dancing:784970376831696897> <#481477520236216350> <a:Dancing:784970376831696897>
    
                    \`\`\`xl\n'Bon amusement sur ` + member.guild.name + ` !!!'\`\`\``)
        .setImage(member.user.avatarURL({ dynamic: true, size: 256 }))
        .setFooter("Nous sommes actuellement " + Number(member.guild.memberCount - 5) + " membres !!!")

    Welcome.send({ embeds: [embed] })
});

client.on('guildMemberRemove', async member => {
    const Welcome = member.guild.channels.cache.get('456861351835336716')

    const embed = new MessageEmbed()
        .setColor(randomColor())
        .setAuthor("Ooh non, un(e) membre est parti(e) de " + member.guild.name, member.user.avatarURL({ dynamic: true, size: 256 }))
        .setDescription(`\`${member.user.tag}\` s'en est allé(e)... <:SadRisitas:763123680439304223>`)
        .setFooter("Nous sommes actuellement " + Number(member.guild.memberCount - 5) + " membres !!!")

    Welcome.send({ embeds: [embed] })
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;

    if (message.guild) {
        let score = client.getScore.get(message.author.id, message.guild.id);

        if (!score) {
            score = {
                id: `${message.guild.id}-${message.author.id}`,
                user: message.author.id,
                guild: message.guild.id,
                points: 0,
                level: 0,
            };
        }

        // Increment the score
        score.points=+2;

        // Calculate the current level through MATH OMG HALP.
        const curLevel = Math.floor(0.1 * Math.sqrt(score.points));

        // Check if the user has leveled up, and let them know if they have:
        if (score.level < curLevel) {
            // Level up!
            score.level++;
            message.reply(
                `Tu as atteint le niveau **${curLevel}** ! N'oublie pas de dab !`
            );
        }

        client.setScore.run(score);
    }

    const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

    // You can modify the code below to remove points from the mentioned user as well!
    if (CMD_NAME === "give") {
        // Limited to guild owner - adjust to your own preference!
        if (!message.author.id === message.guild.ownerId) return message.reply("You're not the boss of me, you can't do that!");

        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) return message.reply("You must mention someone or give their ID!");

        const pointsToAdd = parseInt(args[1], 10);
        if (!pointsToAdd) return message.reply("You didn't tell me how many points to give...");

        // Get their current points.
        let userScore = client.getScore.get(user.id, message.guild.id);

        // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
        if (!userScore) {
            userScore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
        }
        userScore.points += pointsToAdd;

        // We also want to update their level (but we won't notify them if it changes)
        let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
        userScore.level = userLevel;

        // And we save it!
        client.setScore.run(userScore);

        return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userScore.points} points.`);
    }

    if (CMD_NAME === "leaderboard") {
        const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

        // Now shake it and show it! (as a nice embed, too!)
        const embed = new MessageEmbed()
            .setTitle("Leader board")
            .setAuthor(client.user.username, client.user.avatarURL())
            .setDescription("Our top 10 points leaders!")
            .setColor(0x00AE86);

        for (const data of top10) {
            embed.addFields({ name: client.users.cache.get(data.user).tag, value: `${data.points} points (level ${data.level})` });
        }
        return message.channel.send({ embeds: [embed] });
    }

    if (message.content.startsWith(PREFIX)) {
        setTimeout(() => message.delete(), 1000);
        switch (CMD_NAME) {
            case "dégage-moi":
                if (message.member.permissions.has("ADMINISTRATOR")) {
                    kick_id(message, args);
                } else {
                    message.reply("**Tu n'as pas le droit d'utiliser cette commande !** ***BG***").then(msg => { setTimeout(() => msg.delete(), 5000) });
                } break;

            case "ban-moi":
                if (message.member.permissions.has("ADMINISTRATOR")) {
                    ban_id(message, args);
                } else {
                    message.reply("**Tu n'as pas le droit d'utiliser cette commande !** ***BG***").then(msg => { setTimeout(() => msg.delete(), 5000) });
                } break;

            case "consignes":
                if (message.member.permissions.has("ADMINISTRATOR")) {
                    setTimeout(() => message.delete(), 1000);
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
                } break;
            case "levels":
                let score = client.getScore.get(message.author.id, message.guild.id);
                message.reply(`Tu as actuellement ${score.points} points d'expérience et tu es niveau ${score.level}!`).then(msg => { setTimeout(() => msg.delete(), 5000) }); break;
        }

    }

    if (message.content.toLowerCase().startsWith(config.prefix)) {
        setTimeout(() => message.delete(), 1000);
        if (message.channel.id === "474553482691608597") {
            const prefix1 = config.prefix
            const Args = message.content.slice(prefix1.length).trim().split(/ +/g)
            const command = Args.shift().toLowerCase()
            const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
            if (!cmd) return message.reply({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`py\n"Certes tu demandes mes services, mais tu me demandes une commande qui n'existe pas"\`\`\``
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

    if (message.content.toLowerCase().includes("gold")) { Gold(message) }

    if (message.content.toLowerCase().includes("hello")) { Hello(message) }
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
const statut = queue => `Volume: \`${queue.volume}%\` | Filtre: \`${queue.filters.join(", ") || "Non"}\` | Boucle: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Toute la file d'attente" : "Cette Musique" : "Non"}\` | Lecture automatique: \`${queue.autoplay ? "Oui" : "Non"}\``
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
    .on("empty", message => message.channel.send({
        embeds: [{
            color: randomColor(),
            description: `\`\`\`xl\n'Le canal vocal est vide donc je le quitte !'\`\`\``
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
