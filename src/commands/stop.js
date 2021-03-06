const { randomColor } = require("../fonctions/random_color")

module.exports = {
    name: "stop",
    aliases: ["dc", "disconnect", "leave"],
    inVoiceChannel: true,
    run: async (client, Distube, message, args) => {
        const queue = Distube.getQueue(message.guild.id)
        if (!queue)
            return message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`py\n${client.emotes.error} | "Il n'y a rien dans la file d'attente pour le moment!"\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
        queue.stop()
        message.channel.send({
            embeds: [{
                color: randomColor(),
                description: `\`\`\`xl\n${client.emotes.success} | 'Arrêté!'\`\`\``
            }]
        }).then(msg => { setTimeout(() => msg.delete(), 30000) })
    }
}