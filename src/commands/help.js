const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    aliases: ["h", "cmd", "command"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle("Commandes")
            .setDescription(client.commands.map(cmd => `\`${cmd.name}\``).join(", "))
            .setTimestamp()
        message.channel.send(embed)
    }
}