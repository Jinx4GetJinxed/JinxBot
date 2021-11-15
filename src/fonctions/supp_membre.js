const { MessageEmbed } = require("discord.js")
const { randomColor } = require("./random_color")

function supp_membre(member, client) {
    const Welcome = member.guild.channels.cache.get("456861351835336716");

    const embed = new MessageEmbed()
      .setColor(randomColor())
      .setAuthor(
        "Ooh non, un(e) membre est parti(e) de " + member.guild.name,
        member.user.avatarURL({ dynamic: true, size: 256 })
      )
      .setDescription(
        `\`${member.user.tag}\` s'en est allé(e)... <:SadRisitas:763123680439304223>`
      )
      .setFooter(
        "Nous sommes actuellement " +
          Number(member.guild.memberCount - 5) +
          " membres !!!"
      );
  
    Welcome.send({ embeds: [embed] });
}

module.exports = { supp_membre }