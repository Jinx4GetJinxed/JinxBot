export const name = "seek"
export const inVoiceChannel = true
export async function run(client, message, args) {
    const queue = client.distube.getQueue(message)
    if (!queue)
        return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment!`)
    if (!args[0])
        return message.channel.send(`${client.emotes.error} | Veuillez indiquer la position (en secondes) à rechercher!`)
    const time = Number(args[0])
    if (isNaN(time))
        return message.channel.send(`${client.emotes.error} | Veuillez entrer un numéro valide!`)
    queue.seek(time)
    message.channel.send(`Cherche à ${time}!`)
}