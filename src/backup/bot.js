require('dotenv').config();

import { Client, Intents, MessageEmbed, MessageAttachment } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const attachement = new MessageAttachment('./chaumiere.gif', 'chaumiere.gif');
const PREFIX = "Jinx "


process.traceDeprecation = true;

process.on('warning', (warning) => {
    console.log(warning.stack);
});


client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length).
            split(/\s+/);
        /*console.log(CMD_NAME);
        console.log(args);*/

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

        if (CMD_NAME === 'consignes') {
            const Consignes1 = new MessageEmbed()
                .setColor('#33e9ff')
                .setTitle('<a:QuestionMarkGuy:751206439812464722> 𝙻𝙴𝚂 𝚁𝙴𝙶𝙻𝙴𝚂 𝙳𝙴 𝙻𝙰 𝙲𝙷𝙰𝚄𝙼𝙸𝙴𝚁𝙴 <a:QuestionMarkGuy:751206439812464722>')
                .setAuthor("Le bot a été créé par Hakim Id Brahim", message.author.displayAvatarURL(), 'https://www.instagram.com/hakim_id_brahim/?hl=fr')
                .setURL()
                .attachement(attachement)
                .setDescription('\u200B\nVoici les règles à respecter sur 🎮 𝙻𝙰 𝙲𝙷𝙰𝚄𝙼𝙸𝙴𝚁𝙴 👽 :')
                .setThumbnail(message.guild.iconURL())
                .addFields(
                    {
                        name: '\u200B\n\u200B\n𝙱𝚘𝚗𝚗𝚎 𝚎𝚗𝚝𝚎𝚗𝚝𝚎 :\u200B\n',
                        value: "\u200B\n```diff\n- ⚠️ Écrire dans les salons appropriés ⚠️.\n\n- ⚠️ Interdiction de spam ⚠️.\n\n- ⚠️ Les conflits entre les membres seront vite terminés par des mutes ⚠️.\n\n- ⚠️ Tout harcèlement par message privé reporté par un membre est aussitôt sanctionné par un ban ⚠️.```"
                    },

                    {
                        name: '\u200B\n\u200B\n𝙻𝚎𝚜 𝚛𝚘𝚕𝚎𝚜 𝚙𝚊𝚛 𝚗𝚒𝚟𝚎𝚊𝚞𝚡 :\u200B\n',
                        value: `\u200B\nComment avoir des rôles?
                            \u200B\n- En étant tout simplement actif sur le serveur (écrire des messages dans les salons, partager du contenu, venir en vocal.` },

                    {
                        name: '\u200B\n\u200B\n𝚅𝚘𝚒𝚌𝚒 𝚞𝚗𝚎 𝚕𝚒𝚜𝚝𝚎 𝚍𝚎𝚜 𝚛𝚘𝚕𝚎𝚜 :\u200B\n',
                        value: `\u200B\n ░░▒▓█◦•◦>  Niveau de départ: <@&831797926007144478>
                            \u200B\n ░░▒▓█◦•◦>  Niveau 1 : <@&831798215916519434>
                            \u200B\n ░░▒▓█◦•◦>  Niveau 2 : <@&831798217322397716>
                            \u200B\n ░░▒▓█◦•◦>  Niveau 5 : <@&831798219230281728> 
                            \u200B\n ░░▒▓█◦•◦>  Niveau 10 : <@&831798220823724033> 
                            \u200B\n ░░▒▓█◦•◦>  Niveau 15 : <@&840765286403407884>
                            \u200B\n ░░▒▓█◦•◦>  Niveau 20 : <@&831798672211574865> 
                            \u200B\n **░░▒▓█◦•◦> Et une fois que le niveau 30 est atteint tu es direct promu <@&831803492028645386>  !**`},

                    {
                        name: '\u200B\n\u200B\n𝚅𝚘𝚒𝚌𝚒 𝚚𝚞𝚎𝚕𝚚𝚞𝚎𝚜 𝚌𝚘𝚗𝚜𝚎𝚒𝚕𝚜 :\u200B\n',
                        value: `\u200B\n - Pour voir la progression de ton level c'est soit ***/lvl*** (pour voir son propre niveau) ou soit ***/classement*** (pour voir le niveau de tout le monde).
                            \u200B\n - Pour obtenir une listes des commandes sur le serveur écrivez ***Jinx help*** dans le tchat.
                            \u200B\n - De plus si tu nous communiques ton anniversaire par message tu pourras recevoir le rôle <@&814456055986782208> et tu seras tout en haut de la liste des membres ce jour-là.`},
                    {
                        name: `\u200B\n ***Plus on est fou, plus on rit !!!***`,
                        value: `\u200B\n ***- Sois un maximum actif <a:GetNaeNae:751206487631593552> et n'hésite pas à inviter tous tes potes !***
                            \u200B\n ***- N'oublie pas de passer par la case <#534095413662449675> pour que l'on se connaisse un petit peu mieux.***
                            \u200B\n ***- Le but de ce serveur est que tout le monde s'y sente bien. Alors, en cas de problème, contacte moi.***
                            \u200B\n  <a:Dancing:784970376831696897> **Bon amusement l'élite !!! **<a:PartyCat:751206416760569876>`},
                )
                .setImage()
                .setFooter('Tous droits réservés, Jinx Bot©2021 - Id Brahim Hakim • Envoyé le 30 août 2077');

            message.channel.send({ embeds: [Consignes1] });
        }
    }

    if (message.content.toLowerCase().includes('gold')) {
        message.react("<a:Gold:776099501051871242>");
    }

    if (message.content.toLowerCase().includes('hello')) {
        message.reply('tqt pas je suis là');
    }
});





client.login(process.env.DISCORDJS_BOT_TOKEN);
