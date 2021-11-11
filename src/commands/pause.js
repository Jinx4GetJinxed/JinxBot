const { randomColor } = require("../random_color")
module.exports = {
    name: "pause",
    aliases: ["pause", "hold"],
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
        if (queue.pause) {
            queue.resume()
            return message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.success} | 'J'ai repris la chanson pour toi :)'\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 30000) })
        }
        queue.pause()
        message.channel.send({
            embeds: [{
                color: randomColor(),
                description: `\`\`\`xl\n${client.emotes.success} | 'J'ai mis la chanson en pause pour toi :)'\`\`\``
            }]
        }).then(msg => { setTimeout(() => msg.delete(), 30000) })
    }
}