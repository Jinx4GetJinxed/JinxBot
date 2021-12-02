const { randomColor } = require("../fonctions/random_color");
const { MessageEmbed } = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite("./scores.sqlite");
const { getScore_fct, setScore_fct } = require("./tables");
const config = require("../config.json");

async function level_up_message(client, message, level) {
  client.getScore = getScore_fct();
  let score = client.getScore.get(message.author.id, message.guild.id);
  message.reply({
    embeds: [
      {
        color: randomColor(),
        description: `\`${message.member.user.name}\`, tu as atteint le niveau \`${score.level}\` et tu viens de passer au rang ${level} !!!`,
      },
    ],
  });
}

async function ajout_role(RoleID, message) {
  let role = message.guild.roles.cache.find((r) => r.id === RoleID);
  message.member.roles.add(role);
}

async function supp_role(RoleID, message) {
  for (var key in config.role) {
    if (config.role.hasOwnProperty(key)) {
      if (message.member.roles.cache.some((role) => role.id === config.role[key])) {
        let role = message.guild.roles.cache.find((r) => r.id === config.role[key]);
        message.member.roles.remove(role);
      }
    }
  }
}

async function score_add(client, message, messageGuild) {
  client.getScore = getScore_fct();
  client.setScore = setScore_fct();

  let score = client.getScore.get(message.author.id, message.guild.id);

  if (!score) {
    score = {
      id: `${messageGuild.id}-${message.author.id}`,
      user: message.author.id,
      guild: messageGuild.id,
      points: 0,
      level: 0,
    };
  }

  score.points += Math.floor(Math.random() * 10) + 1;
  const curLevel = Math.floor(0.2 * Math.sqrt(score.points));
  var curLevelRound = parseInt(curLevel, 10);
  console.log(curLevelRound)

  switch (true) {
    case curLevelRound=1:
      ajout_role(config.role.beginner, message);
      level_up_message(client, message, "<@&831798215916519434>");
      break;

    case curLevelRound<=2:
      supp_role(config.role.beginner, message);
      ajout_role(config.role.amateur, message);
      level_up_message(client, message, "<@&831798217322397716>");
      break;

    case curLevelRound<=5:
      supp_role(config.role.amateur, message);
      ajout_role(config.role.skilled, message);
      level_up_message(client, message, "<@&831798219230281728>");
      break;

    case curLevelRound<=10:
      supp_role(config.role.skilled, message);
      ajout_role(config.role.conqueror, message);
      level_up_message(client, message, "<@&831798220823724033>");
      break;

    case curLevelRound<=15:
      supp_role(config.role.conqueror, message);
      ajout_role(config.role.marechal, message);
      level_up_message(client, message, "<@&840765286403407884>");
      break;

    case curLevelRound<=20:
      supp_role(config.role.marechal, message);
      ajout_role(config.role.emperor, message);
      level_up_message(client, message, "<@&831798672211574865>");
      break;

    case curLevelRound<=30:
      supp_role(config.role.emperor, message);
      ajout_role(config.role.ketaminator, message);
      level_up_message(client, message, "<@&831803492028645386>");
      break;
  }

  if (score.level < curLevel) {
    score.level++;
    client.setScore.run(score);
    switch (true) {
      case score.level=1:
        ajout_role(config.role.beginner, message);
        level_up_message(client, message, "<@&831798215916519434>");
        break;

      case score.level=2:
        supp_role(config.role.beginner, message);
        ajout_role(config.role.amateur, message);
        level_up_message(client, message, "<@&831798217322397716>");
        break;

      case score.level<=5:
        supp_role(config.role.amateur, message);
        ajout_role(config.role.skilled, message);
        level_up_message(client, message, "<@&831798219230281728>");
        break;

      case score.level<=10:
        supp_role(config.role.skilled, message);
        ajout_role(config.role.conqueror, message);
        level_up_message(client, message, "<@&831798220823724033>");
        break;

      case score.level<=15:
        supp_role(config.role.conqueror, message);
        ajout_role(config.role.marechal, message);
        level_up_message(client, message, "<@&840765286403407884>");
        break;

      case score.level<=20:
        supp_role(config.role.marechal, message);
        ajout_role(config.role.emperor, message);
        level_up_message(client, message, "<@&831798672211574865>");
        break;

      case score.level<=30:
        supp_role(config.role.emperor, message);
        ajout_role(config.role.ketaminator, message);
        level_up_message(client, message, "<@&831803492028645386>");
        break;

      default:
        message.reply({
          embeds: [
            {
              color: randomColor(),
              description: `\`${message.member.name}\`, tu as atteint le niveau \`${score.level}\` ! N'oublie pas de dab !`,
            },
          ],
        });
        break;
    }
  } else {
    client.setScore.run(score);
  }
}

function score_give(message, client, args) {
  if (!message.author.id === "305032028947087360")
    return message.reply(
      "FDP, tu ne t'appelles pas " + message.guild.ownerId.name
    );

  const user =
    message.mentions.users.first() || client.users.cache.get(args);
  if (!user)
    return message.reply(
      "BG, tu dois mentionner quelqu'un ou donner son identité!"
    );

  client.getScore = getScore_fct();
  client.setScore = setScore_fct();

  const pointsToAdd = parseInt(args[1], 10);
  if (!pointsToAdd) return message.reply("Batard tu ne me donne pas de points");

  let userScore = client.getScore.get(user.id, message.guild.id);

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

  let userLevel = Math.floor(0.2 * Math.sqrt(userScore.points));
  userScore.level = userLevel;

  client.setScore.run(userScore);

  return message.channel.send(
    `${user.tag} a reçu ${pointsToAdd} points d'exp et mtn il a ${userScore.points} points.`
  );
}

function show_level(client, message) {
  client.getScore = getScore_fct();

  let score = client.getScore.get(message.author.id, message.guild.id);
  let nextXPscore =
    Math.pow(Math.floor(Number(score.level + 1) / 0.2), 2) - score.points;
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
      setTimeout(() => msg.delete(), 10000);
    });
}

function top_rank(messageChannel, message, client, errorEmote, messageGuild) {
  if (messageChannel === "833824151671930920") {
    const top10 = sql
      .prepare(
        "SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;"
      )
      .all(messageGuild.id);

    const embed = new MessageEmbed()
      .setDescription(
        `\`\`\`xl\n${config.emoji.queue} | 'TOP 10 DU SERVEUR' | ${config.emoji.queue}\`\`\``
      )
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
