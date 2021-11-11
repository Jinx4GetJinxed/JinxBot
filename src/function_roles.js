function emojiChoiceJeux(emojiId, reaction) {
  var role = (() => {
    switch (emojiId) {
      case "754311739620720783":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "754290393457229886"
        );
        break; //GTA5
      case "754313462443671653":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "754290561858666566"
        );
        break; //RB6
      case "754783846066552955":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "754290623573524500"
        );
        break; //Valorant
      case "754790048020562080":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "754290735255257130"
        );
        break; //Trackmania
      case "763117629547479100":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "763120794062553099"
        );
        break; //Rocket League
      case "767696668354543638":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "767696786881249290"
        );
        break; //Overwatch
      case "817701721891536976":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "817700814784430090"
        );
        break; //OSU
      case "818455019069505566":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "817567780865835020"
        );
        break; //HearthStone
      case "818460291305570304":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "818459513517899796"
        );
        break; //Roblox
      case "818479734651486218":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "818481276171452456"
        );
        break; //Paladins
      case "818488189370761277":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "818486311450312705"
        );
        break; //Forza
      case "831671708665643048":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "754290939391901746"
        );
        break; //Minecraft
      case "836830253103710278":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "754290568368095282"
        );
        break; // LoL
      case "836837582910390272":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "754782585275547759"
        );
        break; //COD
      case "851133762791276555":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "851131169905836032"
        );
        break; //WoW
      default:
        return "";
        break;
    }
  })();
  return role;
}

function emojiChoiceLang(emojiName, reaction) {
  let role = (() => {
    switch (emojiName) {
      case "🇫🇷":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "766745071490957324"
        );
        break; //Français
      case "🇬🇧":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "766745008782573609"
        );
        break; //Anglais
      case "🇪🇸":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "766753127549632523"
        );
        break; //Espagnol
      case "🇷🇺":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "769982299441463306"
        );
        break; //Russe
      case "🇳🇱":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "769981613320306699"
        );
        break; //Néerlandais
      case "🇩🇪":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "878409969291120680"
        );
        break; //Allemand
      default:
        return "";
        break;

    }
  })();
  return role;
}

function emojiChoiceAutre(emojiName, reaction) {
  let role = (() => {
    switch (emojiName) {
      case "👨‍🌾":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "833671414371319860"
        );
        break; //Villageois
      case "👩‍🌾":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "742184767348277278"
        );
        break; //Villageoise
      case "🧝‍♂️":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "836004059559231508"
        );
        break; //Autre
      case "🔔":
        return reaction.message.guild.roles.cache.find(
          r => r.id === "825464585255256104"
        );
        break; //Annonce
      default:
        return "";
        break;

    }
  })();
  return role;
}



async function partialMessage(reaction) {
  if (reaction.partial) {
    try {
      await reaction.message.fetch();
    } catch (error) {
      console.error("Une erreur est apparue à cause du fetch:", error);
      return;
    }
  }
}

async function msgAddReaction(reaction) {
  console.log(
    `le message de ${reaction.message.author} a gagné une nouvelle réaction nommée " ${reaction.emoji.name} "`
  );
  console.log(`${reaction.count} utilisateur(s) ont réagi à ce message`);
}

async function msgRemoveReaction(reaction) {
  console.log(
    `le message de ${reaction.message.author} a perdu une réaction nommée " ${reaction.emoji.name} "`
  );
  console.log(`${reaction.count} utilisateur(s) ont réagi à ce message`);
}

async function roleAdd(reaction, user) {
  if (!user.bot) {
    const { guild } = reaction.message;
    const member = guild.members.cache.find(member => member.id === user.id);

    var role = emojiChoiceJeux(reaction.emoji.id, reaction);
    if (role == "") {
      var role = emojiChoiceLang(reaction.emoji.name, reaction);
      if (role == "") {
        var role = emojiChoiceAutre(reaction.emoji.name, reaction)
        if (role == "" && reaction.emoji.id == "831672068256563280") {
          role = reaction.message.guild.roles.cache.find(r => r.id === "559121519100428299");//Online
          rolePlus = reaction.message.guild.roles.cache.find(r => r.id === "818430859656822804");
        } else {
          rolePlus = reaction.message.guild.roles.cache.find(r => r.id === "818430859656822804");
        }
      } else {
        var rolePlus = reaction.message.guild.roles.cache.find(r => r.id === "818431514923630613");
      }
    } else {
      var rolePlus = reaction.message.guild.roles.cache.find(r => r.id === "818430111057313822");
    }

    await member.roles.add(role);
    await member.roles.add(rolePlus);
  }
}

async function roleRemove(reaction, user) {
  if (!user.bot) {
    const { guild } = reaction.message;
    const member = guild.members.cache.find(member => member.id === user.id);

    var role = emojiChoiceJeux(reaction.emoji.id, reaction);
    if (role == "") {
      var role = emojiChoiceLang(reaction.emoji.name, reaction);
    } if (role == "") {
      var role = emojiChoiceAutre(reaction.emoji.name, reaction)
      if (role == "" && reaction.emoji.id == "831672068256563280") {
        role = reaction.message.guild.roles.cache.find(r => r.id === "559121519100428299");//Online
      }
    }

    await member.roles.remove(role);
  }
}

module.exports = { partialMessage, msgAddReaction, msgRemoveReaction, roleAdd, roleRemove }