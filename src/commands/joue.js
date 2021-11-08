module.exports = {
    name: "play",
    aliases: ["p"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const string = args.join(" ")
        if (!string)
            return message.channel.send(`${client.emotes.error} | Veuillez entrer une url de chanson ou une requête pour la recherche.`)
        try {
            client.distube.play(message, string)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | Erreur: \`${e}\``)
        }
    }
}