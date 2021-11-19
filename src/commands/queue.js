const { randomColor } = require("../fonctions/random_color")

module.exports = {
    name: "queue",
    aliases: ["q","queue"],
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue)
            return message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`py\n${client.emotes.error} | "Il n'y a rien dans la file d'attente pour le moment!"\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
        const q = queue.songs.map((song, i) => `${i === 0 ? `\`Je joue:` : `\`${i}.`} ${song.name}\` - \`${song.formattedDuration}\``).join("\n")
        message.channel.send({
            embeds: [{
                color: randomColor(),
                description: `\`\`\`cs\n${client.emotes.queue} | "File d'attente du serveur"\`\`\`\n${q}`
            }]
        })
    }
}