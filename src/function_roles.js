function emojiChoice(emojiId, reaction) {
    let role = (() => {
        switch (emojiId) {
            case "754311739620720783": return reaction.message.guild.roles.cache.find(r => r.id === "754290393457229886"); break; //GTA5

            case "754313462443671653": return reaction.message.guild.roles.cache.find(r => r.id === "754290561858666566"); break; //RB6 

            case "754783846066552955": return reaction.message.guild.roles.cache.find(r => r.id === "754290623573524500"); break; //Valorant

            case "754790048020562080": return reaction.message.guild.roles.cache.find(r => r.id === "754290735255257130"); break; //Trackmania

            case "763117629547479100": return reaction.message.guild.roles.cache.find(r => r.id === "763120794062553099"); break; //Rocket League

            case "767696668354543638": return reaction.message.guild.roles.cache.find(r => r.id === "767696786881249290"); break; //Overwatch

            case "817701721891536976": return reaction.message.guild.roles.cache.find(r => r.id === "817700814784430090"); break; //OSU

            case "818455019069505566": return reaction.message.guild.roles.cache.find(r => r.id === "817567780865835020"); break; //HearthStone

            case "818460291305570304": return reaction.message.guild.roles.cache.find(r => r.id === "818459513517899796"); break; //Roblox

            case "818479734651486218": return reaction.message.guild.roles.cache.find(r => r.id === "818481276171452456"); break; //Paladins

            case "818488189370761277": return reaction.message.guild.roles.cache.find(r => r.id === "818486311450312705"); break; //Forza 

            case "831671708665643048": return reaction.message.guild.roles.cache.find(r => r.id === "754290939391901746"); break; //Minecraft

            case "836830253103710278": return reaction.message.guild.roles.cache.find(r => r.id === "754290568368095282"); break; // LoL

            case "836837582910390272": return reaction.message.guild.roles.cache.find(r => r.id === "754782585275547759"); break; //COD

            case "851133762791276555": return reaction.message.guild.roles.cache.find(r => r.id === "851131169905836032"); break; //WoW
        }
    })()
    return role
}

export async function partialMessage(reaction) {
    if (reaction.partial) {
        try {
            await reaction.message.fetch();

        } catch (error) {
            console.error('Une erreur est apparue à cause du fetch:', error);
            return;
        }

    }
}

export async function msgAddReaction(reaction) {
    console.log(`le message de ${reaction.message.author} a gagné une nouvelle réaction nommée " ${reaction.emoji.name} "`);
	console.log(`${reaction.count} utilisateur(s) ont réagi à ce message`);
}

export async function msgRemoveReaction(reaction) {
    console.log(`le message de ${reaction.message.author} a perdu une réaction nommée " ${reaction.emoji.name} "`);
	console.log(`${reaction.count} utilisateur(s) ont réagi à ce message`);
}

export async function roleAddJeux(reaction, user) {
    if (!user.bot) {
        const { guild } = reaction.message
        const member = guild.members.cache.find(member => member.id === user.id);

        let role = emojiChoice(reaction.emoji.id, reaction)

        await member.roles.add(role)
    }
}

export async function roleRemoveJeux(reaction, user) {
    if (!user.bot) {
        const { guild } = reaction.message
        const member = guild.members.cache.find(member => member.id === user.id);

        let role = emojiChoice(reaction.emoji.id, reaction)

        await member.roles.remove(role)

    }
}