const { randomColor } = require("../fonctions/random_color")

module.exports = {
    name: "play",
    aliases: ["p", "play"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const string = args.join(" ")
        if (!string)
            return message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.error} | 'Veuillez entrer une url de chanson ou une requête pour la recherche.'\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
        try {
            client.distube.play(message, string)
        } catch (e) {
            message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.error} | 'Erreur:' \`${e}\`\`\`\``
                }]
            })
        }
    }
}