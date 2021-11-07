import { MessageEmbed } from "discord.js"

export const name = "help"
export const aliases = ["h", "cmd", "command"]
export async function run(client, message, args) {
    const embed = new MessageEmbed()
        .setTitle("Commandes")
        .setDescription(client.commands.map(cmd => `\`${cmd.name}\``).join(", "))
        .setTimestamp()
    message.channel.send(embed)
}