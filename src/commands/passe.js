const { randomColor } = require("../fonctions/random_color")

module.exports = {
    name: "skip",
    aliases: ["skip","s"],
    inVoiceChannel: true,
    run: async (client, Distube, message, args) => {
        const queue = Distube.getQueue(message.guild.id)
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
                    description: `\`\`\`xl\n${client.emotes.success} | 'Sauté !`
                }]
            })
        } catch (e) {
            message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.error} | 'Erreur:'\`\`\` \`${e}\``
                }]
            })
        }
    }
}