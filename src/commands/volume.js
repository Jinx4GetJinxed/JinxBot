const { randomColor } = require("../fonctions/random_color")

module.exports = {
    name: "volume",
    aliases: ["v", "set", "set-volume"],
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
        const volume = parseInt(args[0])
        if (isNaN(volume))
            return message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.error} | 'Veuillez entrer un numéro valide!'\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
        queue.setVolume(volume)
        message.channel.send({
            embeds: [{
                color: randomColor(),
                description: `\`\`\`xl\n${client.emotes.success} | 'Volume réglé sur ${volume}'\`\`\``
            }]
        }).then(msg => { setTimeout(() => msg.delete(), 10000) })
    }
}