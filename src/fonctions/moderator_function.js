const { randomColor } = require("./random_color")

async function kick_id(message, args) {
  if (!message.member.permissions.has("KICK_MEMBERS"))
    return message.reply(
      "tu ne peux pas utiliser cette commande ptit branleur"
    );

  if (args.length === 0) return message.reply("il manque l'identifiant");

  const member = await message.guild.members.cache.get(args[0]);
  if (member) {
    member
      .kick()
      .then((member) =>
        message.channel.send(`${member}, t'es expulsé et ouais frérot`)
      )
      .catch((err) =>
        message.channel.send("tu ne m' as pas donné la permission :(")
      );
  } else {
    message.channel.send("je ne l'ai pas trouvé ce fdp");
  }
}

async function ban_id(message, args) {
  if (!message.member.permissions.has("BAN_MEMBERS"))
    return message.reply("tu ne peux pas utiliser cette commande sale étron");

  if (args.length === 0) return message.reply("il manque l'identifiant");

  const user = await message.guild.members.ban(args[0]);
  if (user) {
    user
      .then((member) =>
        message.channel.send(`${member}, t'es banni et ouais frérot`)
      )
      .catch((err) =>
        message.channel.send("tu ne m' as pas donné la permission :(")
      );
  } else {
    message.channel.send("je ne l'ai pas trouvé ce fdp");
  }
}

function wrong_channel_cmd(message, emotesError) {
  message
    .reply({
      embeds: [
        {
          color: randomColor(),
          description: `${emotesError} | Tu dois utiliser cette commande dans le channel <#474553482691608597> !`,
        },
      ],
    })
    .then((msg) => {
      setTimeout(() => msg.delete(), 10000);
    });
}

function wrong_channel_cmd1(message, emotesError) {
  message
    .reply({
      embeds: [
        {
          color: randomColor(),
          description: `${emotesError} | Tu dois utiliser cette commande dans le channel <#833824151671930920> !`,
        },
      ],
    })
    .then((msg) => {
      setTimeout(() => msg.delete(), 10000);
    });
}

function not_allowed_cmd(message, emotesError){
    message
    .reply({
      embeds: [
        {
          color: randomColor(),
          description: `\`\`\`py\n${emotesError} | "Tu n'as pas le droit d'utiliser cette commande !"\`\`\``,
        },
      ],
    })
    .then((msg) => {
      setTimeout(() => msg.delete(), 10000);
    });
}

function no_cmd(message, emotesError) {
  message
    .reply({
      embeds: [
        {
          color: randomColor(),
          description: ` \`\`\`py\n${emotesError} | "Certes tu demandes mes services, mais tu me demandes une commande qui n'existe pas"\`\`\``,
        },
      ],
    })
    .then((msg) => {
      setTimeout(() => msg.delete(), 10000);
    });
}

function cmd_no_channel(message, emotesError){
  message
  .reply({
    embeds: [
      {
        color: randomColor(),
        description: `\`\`\`xl\n${emotesError} | 'Tu dois être dans un canal vocal, chacal!'\`\`\``,
      },
    ],
  })
  .then((msg) => {
    setTimeout(() => msg.delete(), 10000);
  });
}

module.exports = { kick_id, ban_id, no_cmd, not_allowed_cmd, wrong_channel_cmd, cmd_no_channel, wrong_channel_cmd1 };
