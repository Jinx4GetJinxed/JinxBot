export const name = "resume"
export const aliases = ["resume", "unpause"]
export const inVoiceChannel = true
export async function run(client, message, args) {
    const queue = client.distube.getQueue(message)
    if (!queue)
        return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment!`)
    queue.resume()
    message.channel.send("J'ai repris la chanson pour toi :)")
}