const { MessageEmbed } = require("discord.js")
const { randomColor } = require("./random_color")

function add_membre(member, client) {
  const Welcome = member.guild.channels.cache.get("456861351835336716");

  const embed = new MessageEmbed()
    .setColor(randomColor())
    .setAuthor(
      "\\✧\\ 𝙹𝚒𝚗𝚡 /✧/ te souhaite aussi la bienvenue",
      client.user.avatarURL({ dynamic: true })
    )
    .setTitle(
      `\`${member.user.tag}\`, tu fais désormais parti(e) de \`${member.guild.name}\``
    )
    .setDescription(
      `\`\`\`xl\n'Si tu veux avoir accès à tous les channels:'\`\`\`<a:Dancing:784970376831696897> <#481477520236216350> <a:Dancing:784970376831696897>
  
                  \`\`\`xl\n'Bon amusement sur ` +
        member.guild.name +
        ` !!!'\`\`\``
    )
    .setImage(member.user.avatarURL({ dynamic: true, size: 256 }))
    .setFooter(
      "Nous sommes actuellement " +
        Number(member.guild.memberCount - 5) +
        " membres !!!"
    );

  Welcome.send({ embeds: [embed] });
}

module.exports = { add_membre }