module.exports = {
    name: "stop",
    aliases: ["dc","disconnect", "leave"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue)
            return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment!`)
        queue.stop()
        message.channel.send(`${client.emotes.success} | Arrêté!`)
    }
}