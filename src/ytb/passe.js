export const name = "skip"
export const inVoiceChannel = true
export async function run(client, message, args) {
    const queue = client.distube.getQueue(message)
    if (!queue)
        return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    try {
        const song = queue.skip()
        message.channel.send(`${client.emotes.success} | Skipped! Now playing:\n${song.name}`)
    } catch (e) {
        message.channel.send(`${client.emotes.error} | ${e}`)
    }
}