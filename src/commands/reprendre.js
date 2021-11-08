module.exports = {
    name: "resume",
    aliases: ["resume", "unpause"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue)
            return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment!`)
        queue.resume()
        message.channel.send("J'ai repris la chanson pour toi :)")
    }
}