function Consignes1(message) {
    return message.channel.send({
        embeds: [{
            color: '#33e9ff',
            author: {
                name: "Ce bot a Ã©tÃ© crÃ©Ã© par Hakim Id Brahim",
                icon_url: message.author.displayAvatarURL(),
                url: 'https://www.instagram.com/hakim_id_brahim/?'
            },
            thumbnail: {
                url: message.guild.iconURL({ size: 1024, dynamic: true })
            },
            title: '<a:QuestionMarkGuy:751206439812464722> ð»ð´ð ðð´ð¶ð»ð´ð ð³ð´ ð»ð° ð²ð·ð°ðð¼ð¸ð´ðð´ <a:QuestionMarkGuy:751206439812464722>',
            description: '\u200B\nVoici les rÃ¨gles Ã  respecter sur ð® ð»ð° ð²ð·ð°ðð¼ð¸ð´ðð´ ð½ :',
            fields: [{
                    name: '\u200B\n\u200B\nð±ðððð ððððððð :\u200B\n',
                    value: "\u200B\n```diff\n- â ï¸ Ãcrire dans les salons appropriÃ©s â ï¸.\n\n- â ï¸ Interdiction de spam â ï¸.\n\n- â ï¸ Les conflits entre les membres seront vite terminÃ©s par des mutes â ï¸.\n\n- â ï¸ Tout harcÃ¨lement par message privÃ© reportÃ© par un membre est aussitÃ´t sanctionnÃ© par un ban â ï¸.```"
                },
                {
                    name: '\u200B\n\u200B\nð»ðð ððððð ððð ððððððð¡ :\u200B\n',
                    value: `\u200B\nComment avoir des rÃ´les?
                                    \u200B\n- En Ã©tant tout simplement actif sur le serveur (Ã©crire des messages dans les salons, partager du contenu, venir en vocal.`
                },

                {
                    name: '\u200B\n\u200B\nððððð ððð ððððð ððð ððððð :\u200B\n',
                    value: `\u200B\n ââââââ¦â¢â¦>  Niveau de dÃ©part: <@&831797926007144478>
                                    \u200B\n ââââââ¦â¢â¦>  Niveau 1 : <@&831798215916519434>
                                    \u200B\n ââââââ¦â¢â¦>  Niveau 2 : <@&831798217322397716>
                                    \u200B\n ââââââ¦â¢â¦>  Niveau 5 : <@&831798219230281728> 
                                    \u200B\n ââââââ¦â¢â¦>  Niveau 10 : <@&831798220823724033> 
                                    \u200B\n ââââââ¦â¢â¦>  Niveau 15 : <@&840765286403407884>
                                    \u200B\n ââââââ¦â¢â¦>  Niveau 20 : <@&831798672211574865> 
                                    \u200B\n **ââââââ¦â¢â¦> Et une fois que le niveau 30 est atteint tu es direct promu <@&831803492028645386>  !**`
                },

                {
                    name: '\u200B\n\u200B\nððððð ðððððððð ðððððððð :\u200B\n',
                    value: `\u200B\n - Pour voir la progression de ton level c'est soit ***/lvl*** (pour voir son propre niveau) ou soit ***/classement*** (pour voir le niveau de tout le monde).
                                    \u200B\n - Pour obtenir une listes des commandes sur le serveur Ã©crivez ***Jinx help*** dans le tchat.
                                    \u200B\n - De plus si tu nous communiques ton anniversaire par message tu pourras recevoir le rÃ´le <@&814456055986782208> et tu seras tout en haut de la liste des membres ce jour-lÃ .`
                },
                {
                    name: `\u200B\n ***Plus on est fou, plus on rit !!!***`,
                    value: `\u200B\n ***- Sois un maximum actif <a:GetNaeNae:751206487631593552> et n'hÃ©site pas Ã  inviter tous tes potes !***
                                    \u200B\n ***- N'oublie pas de passer par la case*** <#534095413662449675> ***pour que l'on se connaisse un petit peu mieux.***
                                    \u200B\n ***- Le but de ce serveur est que tout le monde s'y sente bien. Alors, en cas de problÃ¨me, contacte moi.***
                                    \u200B\n  <a:Dancing:784970376831696897> **Bon amusement l'Ã©lite !!! **<a:PartyCat:751206416760569876>`
                }
            ],
            footer: {
                text: 'Tous droits rÃ©servÃ©s, Jinx BotÂ©2021 - Id Brahim Hakim â¢ EnvoyÃ© le 30 aoÃ»t 2077'
            }
        }]
    });
}

async function Consignes2(message) {
    return await message.channel.send({
        embeds: [{
            color: "#036ffc",
            description: "**Ajoutez vos jeux favoris en cliquant sur les Ã©mojis ci-dessous.** \n â      â      â      â      â      â      â      â      â     â",
        }]
    }).then(M => {
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
            description: `**- Clique sur l'emote pour sÃ©lectionner les langues que tu parles.\n- Click on the emote to pick the language you speak.**\nâ      â      â      â      â      â      â      â      â     â`,
        }]
    }).then(M => {
        M.react("ð«ð·")
        M.react("ð¬ð§")
        M.react("ðªð¸")
        M.react("ð·ðº")
        M.react("ð³ð±")
        M.react("ð©ðª")
    })
}

async function Consignes4(message) {
    return await message.channel.send({
        embeds: [{
            color: "#e633ff",
            description: `**- RÃ©agis avec l'emote qui te correspond le mieux:
                            ð¨âð¾ pour <@&907619111775916062>
                            ð©âð¾ pour <@&907621552005218314>
                            ð§ââï¸ pour <@&907630684003241984>
                            â      â      â      â      â      â      â      â     â**`
        }]
    }).then(M => {
        M.react("ð¨âð¾")
        M.react("ð©âð¾")
        M.react("ð§ââï¸")
    })
}

async function Consignes5(message) {
    return await message.channel.send({
        embeds: [{
            color: "ff3339",
            description: `**- Si tu souhaites Ãªtre notifiÃ© dÃ¨s qu'il y a une annonce sur le serveur, clique sur l'emote ð  ci-dessous et tu obtiendras le rÃ´le <@&907896023777706004>
                            - Pour confirmer que tu agrÃ©es aux rÃ¨gles du serveur, clique sur l'emote â ci-dessous
                            â      â      â      â      â      â      â**`
        }]
    }).then(M => {
        M.react("ð")
        M.react("<a:Verify:831672068256563280>")
    })
}
module.exports = { Consignes1, Consignes2, Consignes3, Consignes4, Consignes5 }