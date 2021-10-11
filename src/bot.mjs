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
<<<<<<< HEAD

=======
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Le traitement du message à échoué: ', error);
            return;
        }
    }
        if (!user.bot) {
            if (reaction.emoji.name == 'GTA') { 

                const role = reaction.message.guild.roles.cache.find(r => r.id === '754290393457229886'); 

                const { guild } = reaction.message 

                const member = guild.members.cache.find(member => member.id === user.id); 

                member.roles.add(role); 

                console.log("c'est bon")

            }
        }

>>>>>>> 8a4b5c53753b879c46cf51f82da667210dd30d3f
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
