const { randomColor } = require("../fonctions/random_color")

module.exports = {
    name: "seek",
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
        if (!args[0])
            return message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.error} | 'Veuillez indiquer la position (en secondes) à rechercher!'\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
        const time = Number(args[0])
        if (isNaN(time))
            return message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.error} | 'Veuillez entrer un numéro valide!'\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
        queue.seek(time)
        message.channel.send({
            embeds: [{
                color: randomColor(),
                description: `\`\`\`xl\n${client.emotes.success} | 'Je place le curseur à ${time} seconde(s)!'\`\`\``
            }]
        })
    }
}