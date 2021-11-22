const { randomColor } = require("../fonctions/random_color");
const { MessageEmbed } = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite("./scores.sqlite");
const { getScore_fct, setScore_fct } = require("./tables");
const config = require("../config.json");

async function level_up_message(message, level) {
  message.reply({
    embeds: [
      {
        color: randomColor(),
        description: `\`${message.member.user.tag}\`, tu as atteint le niveau \`${curLevel}\` et tu viens de passer au rang \`${level}\` !!!`,
      },
    ],
  });
}

async function ajout_role(RoleID, message) {
  let role = message.guild.roles.cache.find((r) => r.id === RoleID);
  message.member.roles.add(role);
}

async function supp_role(RoleID, message) {
  let role = message.guild.roles.cache.find((r) => r.id === RoleID);
  message.member.roles.remove(role);
}

async function score_add(client, message) {
  client.getScore = getScore_fct();
  client.setScore = setScore_fct();

  let score = client.getScore.get(message.author.id, message.guild.id);

  if (!score) {
    score = {
      id: `${message.guild.id}-${message.author.id}`,
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 0,
    };
  }

  // Increment the score
  score.points += Math.floor(Math.random() * 10);

  // Calculate the current level through MATH OMG HALP.
  const curLevel = Math.floor(0.25 * Math.sqrt(score.points));

  // Check if the user has leveled up, and let them know if they have:
  if (score.level < curLevel) {
    // Level up!
    score.level++;
    switch (score.level) {
      case 1:
        ajout_role(config.role.beginner, message);
        level_up_message(message, "<@&831798215916519434>");
        break;

      case 2:
        supp_role(config.role.beginner, message);
        ajout_role(config.role.amateur, message);
        level_up_message(message, "<@&831798217322397716>");
        break;

      case 5:
        supp_role(config.role.amateur, message);
        ajout_role(config.role.skilled, message);
        level_up_message(message, "<@&831798219230281728>");
        break;

      case 10:
        supp_role(config.role.skilled, message);
        ajout_role(config.role.conqueror, message);
        level_up_message(message, "<@&831798220823724033>");
        break;

      case 15:
        supp_role(config.role.conqueror, message);
        ajout_role(config.role.marechal, message);
        level_up_message(message, "<@&840765286403407884>");
        break;

      case 20:
        supp_role(config.role.marechal, message);
        ajout_role(config.role.emperor, message);
        level_up_message(message, "<@&831798672211574865>");
        break;

      case 30:
        supp_role(config.role.emperor, message);
        ajout_role(config.role.ketaminator, message);
        level_up_message(message, "<@&831803492028645386>");
        break;

      default:
        message.reply({
          embeds: [
            {
              color: randomColor(),
              description: `\`${message.member.user.tag}\`, tu as atteint le niveau \`${curLevel}\` ! N'oublie pas de dab !`,
            },
          ],
        });
        break;
    }
  }

  client.setScore.run(score);
}

function score_give(message, args) {
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
  let userScore = client.getScore.get(user.id, message.guild.id);

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

function show_level(client, message) {
  client.getScore = getScore_fct();

  let score = client.getScore.get(message.author.id, message.guild.id);
  let nextXPscore =
    Math.pow(Math.floor(Number(score.level + 1) / 0.25), 2) - score.points;
  return message
    .reply({
      embeds: [
        {
          color: randomColor(),
          description: `Tu as actuellement \`${score.points}\` points d'expérience et tu es niveau \`${score.level}\`!(Prochain niveau dans \`${nextXPscore}\` points d'exp)`,
        },
      ],
    })
    .then((msg) => {
      setTimeout(() => msg.delete(), 5000);
    });
}

function top_rank(messageChannel, message, client, errorEmote) {
  if (messageChannel === "833824151671930920") {
    const top10 = sql
      .prepare(
        "SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;"
      )
      .all(message.guild.id);

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
