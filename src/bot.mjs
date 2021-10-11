import {} from 'dotenv/config';
import { consignes1, consignes2 } from './consignes_function.js';
import { Gold, commenceParHello } from './cmd_startwith.js';
import { kick } from './kick_function.js';
import { Client, Intents } from 'discord.js';

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
            kick()
        }

        /** Fonction pour afficher les consignes */
        if (CMD_NAME === 'consignes') {
            consignes1();

            consignes2();
        }

        if (message.content.toLowerCase().includes('gold')) {
            Gold(message)
        }
    
        if (message.content.toLowerCase().includes('hello')) {
            commenceParHello();
        }
    }
});


client.on('messageReactionAdd', async (reaction, user) => {

});

client.login(process.env.DISCORDJS_BOT_TOKEN);
