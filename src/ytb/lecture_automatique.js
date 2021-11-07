export const name = "autoplay"
export const inVoiceChannel = true
export async function run(client, message, args) {
    const queue = client.distube.getQueue(message)
    if (!queue)
        return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment!`)
    try {
        const autoplay = queue.toggleAutoplay()
        message.channel.send(`${client.emotes.success} | Lecture Automatique: \`${autoplay ? "Oui" : "Non"}\``)
    } catch (e) {
        message.channel.send(`${client.emotes.error} | ${e}`)
    }
}