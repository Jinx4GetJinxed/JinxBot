import { } from 'dotenv/config';
import { Client, Intents} from 'discord.js';
import { Gold, Hello } from './cmd_startwith.js';
import { Consignes1, Consignes2 } from './consignes_function.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }, { partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const PREFIX = "Jinx "

client.on('ready', () => {
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
            if (!message.member.permissions.has('KICK_MEMBERS'))
                return message.reply('tu ne peux pas utiliser cette commande ptit branleur');

            if (args.length === 0)
                return message.reply('il manque l\'identifiant');

            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member.kick()
                    .then((member) => message.channel.send(`${member}, t'es expulsé et ouais frérot`))
                    .catch((err) => message.channel.send('tu ne m\' as pas donné la permission :('));
            } else {
                message.channel.send('je ne l\'ai pas trouvé ce fdp')
            }

        } else if (CMD_NAME === 'ban-moi') {
            if (!message.member.permissions.has('BAN_MEMBERS'))
                return message.reply('tu ne peux pas utiliser cette commande sale étron');

            if (args.length === 0)
                return message.reply('il manque l\'identifiant');

            const user = await message.guild.members.ban(args[0]);
            if (user) {
                user.then((member) => message.channel.send(`${member}, t'es banni et ouais frérot`))
                    .catch((err) => message.channel.send('tu ne m\' as pas donné la permission :('));
            } else {
                message.channel.send('je ne l\'ai pas trouvé ce fdp')
            }
        }

        /** Fonction pour afficher les consignes */
        if (CMD_NAME === 'consignes') {
            if (message.member.permissions.has("ADMINISTRATOR")) {
                message.channel.send(Consignes1)

                message.channel.send(Consignes2)

            }
        }
    }

    if (message.content.toLowerCase().includes('gold')) {
        Gold(message);
    }

    if (message.content.toLowerCase().includes('hello')) {
        Hello(message);
    }

});


client.on('messageReactionAdd', async (reaction, user) => {
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
