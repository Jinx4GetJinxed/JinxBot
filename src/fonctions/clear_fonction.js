const config = require("../config.json")
const { randomColor } = require("../fonctions/random_color.js")

async function clear_command(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
        return message.channel
            .send(
                "Tu ne peux pas faire cette commande, tu n'es pas un admin",
            ).then((msg) => {
                setTimeout(() => msg.channel.delete(), 10000);
            })
    }

    if (isNaN(args)) {
        return message.channel
            .send('Je dois delete combien de message?')
            .then((msg) => {
                setTimeout(() => msg.channel.delete(), 10000);
            })
    }

    if (Number(args) < 0) {
        return message.channel
            .send('entre un chiffre positif chacal')
            .then((msg) => {
                msg.delete({ timeout: 10000 });
            })
    }

    const amount = Number(args) > 200
        ? 101
        : Number(args) + 1;

    message.channel.bulkDelete(amount).then((messages) => message.channel
        .send(
            ({
                embeds: [
                    {
                        color: randomColor(),
                        description: `\`\`\`py\n${config.emoji.success} | "J'ai supprimé ${messages.size - 1} message(s)"\`\`\``,
                    },
                ],
            }))
        .then((msg) => { setTimeout(() => msg.delete(), 10000 )})
        .catch((err) => { console.log(err) }))
}

module.exports = { clear_command }