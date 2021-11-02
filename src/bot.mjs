import { } from 'dotenv/config';
import { Client, Intents } from 'discord.js';
import { Gold, Hello } from './cmd_startwith.js';
import { kick_id, ban_id } from './moderator_function.js';
import { bio, status } from './statut.js';
import { Consignes1, Consignes2 } from './consignes_function.js';
import { partialMessage, roleAdd, roleRemove } from './function_roles.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] }, { partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
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
            if (message.member.permissions.has('ADMINISTRATOR')) {
                Consignes1(message);
                Consignes2(message);
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
    if (reaction.partial) {
        try {
            await reaction.fetch();

        } catch (error) {
            console.error('Une erreur est apparue à cause du fetch:', error);
            return;
        }

    }
    console.log(`le message de ${reaction.message.author} à une nouvelle réaction nommée " ${reaction.emoji.name}""`);
	console.log(`${reaction.count} utilisateur(s) ont réagi à ce message`)

    roleAdd(reaction, user)
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();

        } catch (error) {
            console.error('Une erreur est apparue à cause du fetch:', error);
            return;
        }

    }
    console.log(`le message de ${reaction.message.author} à une nouvelle réaction nommée " ${reaction.emoji.name}""`);
	console.log(`${reaction.count} utilisateur(s) ont réagi à ce message`);

    roleRemove(reaction, user)
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
