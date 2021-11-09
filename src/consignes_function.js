function Consignes1(message) {
    return message.channel.send({
        embeds: [{
            color: '#33e9ff',
            author: {
                name: "Ce bot a été créé par Hakim Id Brahim",
                icon_url: message.author.displayAvatarURL(),
                url: 'https://www.instagram.com/hakim_id_brahim/?'
            },
            thumbnail: {
                url: message.guild.iconURL({ size: 1024, dynamic: true })
            },
            title: '<a:QuestionMarkGuy:751206439812464722> 𝙻𝙴𝚂 𝚁𝙴𝙶𝙻𝙴𝚂 𝙳𝙴 𝙻𝙰 𝙲𝙷𝙰𝚄𝙼𝙸𝙴𝚁𝙴 <a:QuestionMarkGuy:751206439812464722>',
            description: '\u200B\nVoici les règles à respecter sur 🎮 𝙻𝙰 𝙲𝙷𝙰𝚄𝙼𝙸𝙴𝚁𝙴 👽 :',
            fields: [{
                name: '\u200B\n\u200B\n𝙱𝚘𝚗𝚗𝚎 𝚎𝚗𝚝𝚎𝚗𝚝𝚎 :\u200B\n',
                value: "\u200B\n```diff\n- ⚠️ Écrire dans les salons appropriés ⚠️.\n\n- ⚠️ Interdiction de spam ⚠️.\n\n- ⚠️ Les conflits entre les membres seront vite terminés par des mutes ⚠️.\n\n- ⚠️ Tout harcèlement par message privé reporté par un membre est aussitôt sanctionné par un ban ⚠️.```"
            },
            {
                name: '\u200B\n\u200B\n𝙻𝚎𝚜 𝚛𝚘𝚕𝚎𝚜 𝚙𝚊𝚛 𝚗𝚒𝚟𝚎𝚊𝚞𝚡 :\u200B\n',
                value: `\u200B\nComment avoir des rôles?
                                    \u200B\n- En étant tout simplement actif sur le serveur (écrire des messages dans les salons, partager du contenu, venir en vocal.`
            },

            {
                name: '\u200B\n\u200B\n𝚅𝚘𝚒𝚌𝚒 𝚞𝚗𝚎 𝚕𝚒𝚜𝚝𝚎 𝚍𝚎𝚜 𝚛𝚘𝚕𝚎𝚜 :\u200B\n',
                value: `\u200B\n ░░▒▓█◦•◦>  Niveau de départ: <@&831797926007144478>
                                    \u200B\n ░░▒▓█◦•◦>  Niveau 1 : <@&831798215916519434>
                                    \u200B\n ░░▒▓█◦•◦>  Niveau 2 : <@&831798217322397716>
                                    \u200B\n ░░▒▓█◦•◦>  Niveau 5 : <@&831798219230281728> 
                                    \u200B\n ░░▒▓█◦•◦>  Niveau 10 : <@&831798220823724033> 
                                    \u200B\n ░░▒▓█◦•◦>  Niveau 15 : <@&840765286403407884>
                                    \u200B\n ░░▒▓█◦•◦>  Niveau 20 : <@&831798672211574865> 
                                    \u200B\n **░░▒▓█◦•◦> Et une fois que le niveau 30 est atteint tu es direct promu <@&831803492028645386>  !**`
            },

            {
                name: '\u200B\n\u200B\n𝚅𝚘𝚒𝚌𝚒 𝚚𝚞𝚎𝚕𝚚𝚞𝚎𝚜 𝚌𝚘𝚗𝚜𝚎𝚒𝚕𝚜 :\u200B\n',
                value: `\u200B\n - Pour voir la progression de ton level c'est soit ***/lvl*** (pour voir son propre niveau) ou soit ***/classement*** (pour voir le niveau de tout le monde).
                                    \u200B\n - Pour obtenir une listes des commandes sur le serveur écrivez ***Jinx help*** dans le tchat.
                                    \u200B\n - De plus si tu nous communiques ton anniversaire par message tu pourras recevoir le rôle <@&814456055986782208> et tu seras tout en haut de la liste des membres ce jour-là.`
            },
            {
                name: `\u200B\n ***Plus on est fou, plus on rit !!!***`,
                value: `\u200B\n ***- Sois un maximum actif <a:GetNaeNae:751206487631593552> et n'hésite pas à inviter tous tes potes !***
                                    \u200B\n ***- N'oublie pas de passer par la case*** <#534095413662449675> ***pour que l'on se connaisse un petit peu mieux.***
                                    \u200B\n ***- Le but de ce serveur est que tout le monde s'y sente bien. Alors, en cas de problème, contacte moi.***
                                    \u200B\n  <a:Dancing:784970376831696897> **Bon amusement l'élite !!! **<a:PartyCat:751206416760569876>`
            }],
            footer: {
                text: 'Tous droits réservés, Jinx Bot©2021 - Id Brahim Hakim • Envoyé le 30 août 2077'
            }
        }]
    });
}

async function Consignes2(message) {
    return await message.channel.send({
        embeds: [{
            color: "#036ffc",
            description: "**Ajoutez vos jeux favoris en cliquant sur les émojis ci-dessous.** \n ↓      ↓      ↓      ↓      ↓      ↓      ↓      ↓      ↓     ↓",
        }]}).then(M => {
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
        })
}

async function Consignes3(message) {
    return await message.channel.send({
        embeds: [{
            color: "#8236FF",
            description:`**- Clique sur l'emote pour sélectionner les langues que tu parles.\n- Click on the emote to pick the language you speak.**\n↓      ↓      ↓      ↓      ↓      ↓      ↓      ↓      ↓     ↓`,
        }]}).then(M => {
            M.react("🇫🇷")
            M.react("🇬🇧")
            M.react("🇪🇸")
            M.react("🇷🇺")
            M.react("🇳🇱")
            M.react("🇩🇪")
        })
}

async function Consignes4(message) {
    return await message.channel.send({
        embeds: [{
            color: "#e633ff",
            description: `**- Réagis avec l'emote qui te correspond le mieux:
                            👨‍🌾 pour <@&907619111775916062>
                            👩‍🌾 pour <@&907621552005218314>
                            🧝‍♂️ pour <@&907630684003241984>
                            ↓      ↓      ↓      ↓      ↓      ↓      ↓      ↓     ↓**`
    }]}).then(M => {
        M.react("👨‍🌾")
        M.react("👩‍🌾")
        M.react("🧝‍♂️")
    })
}

async function Consignes5(message) {
    return await message.channel.send({
        embeds: [{
            color: "ff3339",
            description:`- Si tu souhaites être notifié dès qu'il y a une annonce sur le serveur, clique sur l'emote 🔔  ci-dessous et tu obtiendras le rôle @𝘼𝙣𝙣𝙤𝙣𝙘𝙚 ! 
                            - Pour confirmer que tu agrées aux règles du serveur, clique sur l'emote ✅ ci-dessous
                            ↓      ↓      ↓      ↓      ↓      ↓      ↓`
    }]})
}
module.exports = { Consignes1, Consignes2, Consignes3, Consignes4, Consignes5}