export const name = "volume"
export const aliases = ["v", "set", "set-volume"]
export const inVoiceChannel = true
export async function run(client, message, args) {
    const queue = client.distube.getQueue(message)
    if (!queue)
        return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment!`)
    const volume = parseInt(args[0])
    if (isNaN(volume))
        return message.channel.send(`${client.emotes.error} | Veuillez entrer un numéro valide!`)
    queue.setVolume(volume)
    message.channel.send(`${client.emotes.success} | Volume réglé sur \`${volume}\``)
}