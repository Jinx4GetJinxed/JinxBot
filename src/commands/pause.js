export const name = "pause"
export const aliases = ["pause", "hold"]
export const inVoiceChannel = true
export async function run(client, message, args) {
    const queue = client.distube.getQueue(message)
    if (!queue)
        return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment!`)
    if (queue.pause) {
        queue.resume()
        return message.channel.send("J'ai repris la chanson pour toi  :)")
    }
    queue.pause()
    message.channel.send("J'ai mis la chanson en pause pour toi :)")
}