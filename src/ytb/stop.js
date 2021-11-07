export const name = "stop"
export const aliases = ["disconnect", "leave"]
export const inVoiceChannel = true
export async function run(client, message, args) {
    const queue = client.distube.getQueue(message)
    if (!queue)
        return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment!`)
    queue.stop()
    message.channel.send(`${client.emotes.success} | Arrêté!`)
}