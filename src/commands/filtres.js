export const name = "filter"
export const aliases = ["filters"]
export const inVoiceChannel = true
export async function run(client, message, args) {
    const queue = client.distube.getQueue(message)
    if (!queue)
        return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d'attente pour le moment!`)
    if (args[0] === "off" && queue.filters?.length)
        queue.setFilter(false)
    else if (Object.keys(client.distube.filters).includes(args[0]))
        queue.setFilter(args[0])
    else if (args[0])
        return message.channel.send(`${client.emotes.error} | Pas un filtre valide`)
    message.channel.send(`Filtre de la file d'attente actuelle: \`${queue.filters.join(", ") || "Non"}\``)
}