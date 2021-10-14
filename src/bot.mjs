import { } from 'dotenv/config';
import { Client, Intents, MessageEmbed } from 'discord.js';
import { Gold, Hello } from './cmd_startwith.js';
import { kick_id, ban_id } from './moderator_function.js';
import { bio, status } from './statut.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }, { partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const PREFIX = "Jinx "


client.on('ready', () => {

    setInterval(() => {
        var Description_Status = bio();
        client.user.setActivity(Description_Status.message, { type: Description_Status.type })
    }, 5000);

    setInterval(() => {
        var type_status = status();
        client.user.setStatus(type_status)
    }, 15000);

    console.log(`le bot ${client.user.tag} est connecté`)

});


client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length).
        split(/\s+/);

    if (message.content.startsWith(PREFIX)) {
        /** Fonction pour kick */
        if (CMD_NAME === 'dégage-moi') {
            kick_id(message, args);

        } else if (CMD_NAME === 'ban-moi') {
            ban_id(message, args)
        }

        /** Fonction pour afficher les consignes */
        if (CMD_NAME === 'consignes') {
            if (!message.member.permissions.has('ADMINISTRATOR')) {
                let consignes1 = require('./consignes_function.js')
                message.channel.send({ embed: consignes1 })

                const Consignes2 = new MessageEmbed()
                    .setColor("#036ffc")
                    .setDescription("**𝖠𝗃𝗈𝗎𝗍𝖾𝗓 𝗏𝗈𝗌 𝗃𝖾𝗎𝗑 𝗆𝗎𝗅𝗍𝗂𝗃𝗈𝗎𝖾𝗎𝗋𝗌 𝖿𝖺𝗏𝗈𝗋𝗂𝗌 𝖾𝗇 𝖼𝗅𝗂𝗊𝗎𝖺𝗇𝗍 𝗌𝗎𝗋 𝗅𝖾𝗌 𝖾𝗆𝗈𝗃𝗂𝗌 𝖼𝗂-𝖽𝖾𝗌𝗌𝗈𝗎𝗌.** \n ↓      ↓      ↓      ↓      ↓      ↓      ↓      ↓      ↓     ↓")

                message.channel.send({ embeds: [Consignes2] }).then(M => {
                    M.react("<a:GTA:754311739620720783>")
                    M.react("<a:RB6:754313462443671653>")
                    M.react("<a:Valorant:754783846066552955>")
                    M.react("<a:TrackMania:754790048020562080>")
                    M.react("<a:RocketLeague:763117629547479100>")
                    M.react("<a:Overwatch:767696668354543638>")
                    M.react("<a:osu:817701721891536976>")
                    M.react("<a:HearthStone:818455019069505566>")
                    M.react("<a:Roblox:818460291305570304>")
                    M.react("<a:Paladins:818479734651486218>")
                    M.react("<a:Forza:818488189370761277>")
                    M.react("<a:Minecraft:831671708665643048>")
                    M.react("<a:LoL:836830253103710278>")
                    M.react("<a:CoD:836837582910390272>")
                    M.react("<a:WoW:851133762791276555>")
                });
            }
        }

    }
    if (message.content.toLowerCase().includes('gold')) {
        Gold(message)
    }

    if (message.content.toLowerCase().includes('hello')) {
        Hello(message)
    }
});


client.on('messageReactionAdd', async (reaction, user) => {
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
