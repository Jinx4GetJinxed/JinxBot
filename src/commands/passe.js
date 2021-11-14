const { randomColor } = require("../fonctions/random_color")

module.exports = {
    name: "skip",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue)
            return message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`py\n${client.emotes.error} | "Il n'y a rien dans la file d'attente pour le moment !"\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
        try {
            const song = queue.skip()
            message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.success} | 'Sauté ! En cours de lecture:' \`${song.name}\`\`\`\``
                }]
            })
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