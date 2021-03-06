const { randomColor } = require("../fonctions/random_color")

module.exports = {
    name: "repeat",
    aliases: ["loop", "rp"],
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
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
            case "q":
                mode = 2
                break;
            default:
                mode = -1
                break
        }
        if (mode != -1) {
            mode = queue.setRepeatMode(mode)
            mode = mode ? mode === 2 ? "Répétition de la file d'attente" : "Répéter la chanson" : "Off"
            message.channel.send({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.repeat} | 'Réglez le mode de répétition sur'\`\`\` \`${mode}\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
        }else{
            message.reply({
                embeds: [{
                    color: randomColor(),
                    description: `\`\`\`xl\n${client.emotes.error} | 'Que dois-je itérer?'\`\`\``
                }]
            }).then(msg => { setTimeout(() => msg.delete(), 10000) })
        }
    }
}