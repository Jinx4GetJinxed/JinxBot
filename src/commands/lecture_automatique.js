const { randomColor } = require("../random_color")

module.exports = {
    name: "autoplay",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue)
            return message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`py\n${client.emotes.error} | "Il n'y a rien dans la file d'attente pour le moment!"\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
        try {
            const autoplay = queue.toggleAutoplay()
            message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.success} | 'Lecture Automatique:' \`${autoplay ? "Oui" : "Non"}\`\`\`\``
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