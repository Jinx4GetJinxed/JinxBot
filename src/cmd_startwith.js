import { Client, Intents } from 'discord.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }, { partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

export function Gold(message) {
    message.react("<a:Gold:776099501051871242>");
}


export function commenceParHello(){
    message.reply('tqt pas je suis là');
}