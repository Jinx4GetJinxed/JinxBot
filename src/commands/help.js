const { MessageEmbed } = require("discord.js")
const { randomColor } = require("../fonctions/random_color")

module.exports = {
    name: "help",
    aliases: ["h", "cmd", "command"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor(randomColor())
            .setTitle("Commandes pour la musique\n")
            .setDescription("```xl\nVoici les commandes à rajouter après le préfixe 'Powder!':\n``` ```xl\n-'p, play [URL],[NOM]':``` permet de jouer une musique\n ```xl\n-'pause, hold':``` permet de mettre en pause une musique ```xl\n-'resume, unpause':``` permet de reprendre la musique ```xl\n-'filters':``` permet d'utiliser un des nombreux filtres(bassboost, nightcore, vaporwave,...) ```xl\n-'seek [secondes]':``` permet de se placer à la seconde indiquée dans la musique ```xl\n-'previous':``` permet de jouer la musique précédente ```xl\n-'q':``` permet de visualiser la file d'attente du serveur ```xl\n-'loop, rp [off, song, queue]':``` permet de reboucler une musique ou une file d'attente ```xl\n-'dc, disconnect, leave':``` permet de déconnecter le bot")
        message.channel.send({ embeds: [embed] })
    }
}