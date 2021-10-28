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
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message:', error);
            return;
        }
    }

    console.log(`${reaction.message.author.name}'s message "${reaction.message.content}" gained a reaction!`);
    console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
}

export async function roleAdd(reaction, user) {
    if (!user.bot) {
        if (reaction.message.partial) await reaction.message.fetch()
        if (reaction.partial) await reaction.fetch()

        const { guild } = reaction.message
        const member = guild.members.cache.find(member => member.id === user.id);

        let role = emojiChoice(reaction.emoji.id, reaction)

        await member.roles.add(role)

    }
}

export async function roleRemove(reaction, user) {
    if (!user.bot) {
        if (reaction.message.partial) await reaction.message.fetch()
        if (reaction.partial) await reaction.fetch()

        const { guild } = reaction.message
        const member = guild.members.cache.find(member => member.id === user.id);

        let role = emojiChoice(reaction.emoji.id, reaction)

        await member.roles.remove(role)

    }
}