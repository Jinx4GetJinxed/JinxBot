const { Collection, Client, Intents } = require("discord.js");
const { create_table, table_prep } = require("../level/tables");
const { bio, status } = require("../fonctions/statut");
const { add_membre } = require("../fonctions/ajout_membre");
const {} = require("dotenv/config");
const {
    log_member_add,
    log_member_remove,
    log_member_kick,
} = require("../logs/log_member");
const { creationMessage } = require("../fonctions/cmd_startwith");
const { supp_membre } = require("../fonctions/supp_membre");
const { log_message_delete } = require("../logs/log_message");
const {
    partialMessage,
    msgAddReaction,
    roleAdd,
} = require("../fonctions/function_roles");

const { DisTube } = require("distube");

const { default: SpotifyPlugin } = require("@distube/spotify");
const { default: SoundCloudPlugin } = require("@distube/soundcloud");
const { message_distube } = require("../message_distube/main_message")
const { YtDlpPlugin } = require("@distube/yt-dlp");
const config = require("../config.json");
const fs = require("fs");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    youtubeDL: false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin(), new YtDlpPlugin()],
});
client.commands = new Collection();
client.aliases = new Collection();
client.emotes = config.emoji;

async function lecteur_fs() {
    fs.readdir("./src/commands/", (err, files) => {
        if (err) return console.log("Could not find any commands!");
        const jsFiles = files.filter((f) => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) return console.log("Could not find any commands!");
        jsFiles.forEach((file) => {
            const cmd = require(`../commands/${file}`);
            console.log(`chargé ${file}`);
            client.commands.set(cmd.name, cmd);
            if (cmd.aliases)
                cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
        });
    });
}

async function lecteur_ready() {
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
}

async function lecteur_guildMemberAdd() {
    client.on("guildMemberAdd", async(member) => {
        add_membre(member, client);
        log_member_add(client, member);
    });
}

async function lecteur_guildMemberRemove() {
    client.on("guildMemberRemove", async(member) => {
        supp_membre(member, client);
        log_member_kick(client, member).then((rateable) => {
            if (rateable === undefined) {
                log_member_remove(client, member);
            }
        });
    });
}

async function lecteur_messageCreate() {
    client.on("messageCreate", async(message) => {
        creationMessage(client, message);
    });
}

async function lecteur_messageDelete() {
    client.on("messageDelete", async(message) => {
        log_message_delete(client, message);
    });
}

async function lecteur_messageReactionAdd() {
    client.on("messageReactionAdd", async(reaction, user) => {
        partialMessage(reaction);
        msgAddReaction(reaction);
        if (reaction.message.channel.id === "481477520236216350") {
            roleAdd(reaction, user);
        }
    });
}

async function lecteur_messageReactionRemove() {
    client.on("messageReactionRemove", async(reaction, user) => {
        partialMessage(reaction);
        msgRemoveReaction(reaction);
        if (reaction.message.channel.id === "481477520236216350") {
            roleRemove(reaction, user);
        }
    });
}

async function lecteur_guildBanAdd() {
    client.on("guildBanAdd", (member) => {
        log_member_ban_add(client, member);
    });
}

async function lecteur_guilBanRemove() {
    client.on("guildBanRemove", (member) => {
        log_member_ban_remove(client, member);
    });
}

async function lecteur_distube() {
    message_distube(client.distube, client.emotes);
}

async function lecteur_token() {
    client.login(process.env.DISCORDJS_BOT_TOKEN);
}

module.exports = {
    lecteur_fs,
    lecteur_ready,
    lecteur_guildMemberAdd,
    lecteur_guildMemberRemove,
    lecteur_messageCreate,
    lecteur_messageDelete,
    lecteur_messageReactionAdd,
    lecteur_messageReactionRemove,
    lecteur_guildBanAdd,
    lecteur_guilBanRemove,
    lecteur_distube,
    lecteur_token
};