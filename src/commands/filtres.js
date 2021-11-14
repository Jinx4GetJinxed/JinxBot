const { randomColor } = require("../fonctions/random_color")

module.exports = {
    name: "filter",
    aliases: ["filters"],
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
        if (args[0] === "off" && queue.filters?.length)
            queue.setFilter(false)
        else if (Object.keys(client.distube.filters).includes(args[0]))
            queue.setFilter(args[0])
        else if (args[0])
            return message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.error} | 'Pas un filtre valide'\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
        message.channel.send({
            embeds: [{
                color: randomColor(),
                description: `\`\`\`xl\n${client.emotes.success} | 'Filtre dans la file d'attente actuelle: \`${queue.filters.join(", ") || "Non"}'\`\`\`\``
            }]
        })
    }
}