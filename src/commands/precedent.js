export const name = "previous"
export const inVoiceChannel = true
export async function run(client, message, args) {
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