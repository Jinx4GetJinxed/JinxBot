module.exports = {
    name: "previous",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue)
            return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment!`)
        try {
            const song = queue.previous()
            message.channel.send(`${client.emotes.success} | En cours de lecture:\n${song.name}`)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | ${e}`)
        }
    }
}