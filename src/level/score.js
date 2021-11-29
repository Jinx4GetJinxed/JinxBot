const { randomColor } = require('../fonctions/random_color');
const { MessageEmbed } = require('discord.js')
const SQLite = require("better-sqlite3");
const sql = new SQLite("./scores.sqlite");

async function score_add(getScore, setScore, message, messageGuild) {
  console.log(1)
  let score = getScore.get(message.author.id, messageGuild.id);

  if (!score) {
    score = {
      id: `${messageGuild.id}-${message.author.id}`,
      user: message.author.id,
      guild: messageGuild.id,
      points: 0,
      level: 0,
    };
  }

  // Increment the score
  score.points++;
  console.log(score.points)
  console.log(1)

  // Calculate the current level through MATH OMG HALP.
  const curLevel = Math.floor(0.1 * Math.sqrt(score.points));

  // Check if the user has leveled up, and let them know if they have:
  if (score.level < curLevel) {
    // Level up!
    score.level++;
    switch (score.level) {
      case 1:
        message.author.roles.add(config.role.beginner);
        break;

      case 2:
        message.author.roles.remove(config.role.beginner);
        message.author.roles.add(config.role.amateur);
        break;

      case 5:
        message.author.roles.remove(config.role.amateur);
        message.author.roles.add(config.role.skilled);
        break;

      case 10:
        message.author.roles.remove(config.role.skilled);
        message.author.roles.add(config.role.conqueror);
        break;

      case 15:
        message.author.roles.remove(config.role.conqueror);
        message.author.roles.add(config.role.marechal);
        break;

      case 20:
        message.author.roles.remove(config.role.marechal);
        message.author.roles.add(config.role.emperor);
        break;

      case 30:
        message.author.roles.remove(config.role.emperor);
        message.author.roles.add(config.role.ketaminator);
        break;
    }
    message.reply(
      `\`\`\`xl\n'Tu as atteint le niveau \`**${curLevel}**\` ! N'oublie pas de dab !'\`\`\``
    );
  }

  setScore.run(score);
}

function score_give(message, client, getScore, args) {
  // Limited to guild owner - adjust to your own preference!
  if (!message.author.id === "305032028947087360")
    return message.reply(
      "FDP, tu ne t'appelles pas " + message.guild.ownerId.name
    );

  const user =
    message.mentions.users.first() || client.users.cache.get(args[0]);
  if (!user)
    return message.reply(
      "BG, tu dois mentionner quelqu'un ou donner son identité!"
    );

  const pointsToAdd = parseInt(args[1], 10);
  if (!pointsToAdd)
    return message.reply("You didn't tell me how many points to give...");

  // Get their current points.
  let userScore = getScore.get(user.id, message.guild.id);

  // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
  if (!userScore) {
    userScore = {
      id: `${message.guild.id}-${user.id}`,
      user: user.id,
      guild: message.guild.id,
      points: 0,
      level: 1,
    };
  }
  userScore.points += pointsToAdd;

  // We also want to update their level (but we won't notify them if it changes)
  let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
  userScore.level = userLevel;

  // And we save it!
  client.setScore.run(userScore);

  return message.channel.send(
    `${user.tag} has received ${pointsToAdd} points and now stands at ${userScore.points} points.`
  );
}

function show_level(getScore, message, messageGuild) {
  let score = getScore.get(message.author.id, messageGuild.id);
  return message
    .reply(
      `Tu as actuellement ${score.points} points d'expérience et tu es niveau ${score.level}!`
    )
    .then((msg) => {
      setTimeout(() => msg.delete(), 5000);
    });
}

function top_rank(messageChannel, message, client, errorEmote, messageGuild) {
  if (messageChannel === "833824151671930920") {
    const top10 = sql
      .prepare(
        "SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;"
      )
      .all(messageGuild.id);

    // Now shake it and show it! (as a nice embed, too!)
    const embed = new MessageEmbed()
      .setTitle("TOP 10 DU SERVEUR")
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor(randomColor());

    for (const data of top10) {
      embed.addFields({
        name: client.users.cache.get(data.user).tag,
        value: `${data.points} points d'expérience (niveau ${data.level})`,
      });
    }
    return message.channel.send({ embeds: [embed] });
  } else {
    message
      .reply({
        embeds: [
          {
            color: randomColor(),
            description: `${errorEmote} | Tu dois utiliser cette commande dans le channel <#833824151671930920> !`,
          },
        ],
      })
      .then((msg) => {
        setTimeout(() => msg.delete(), 10000);
      });
  }
}

module.exports = { score_add, score_give, show_level, top_rank };
