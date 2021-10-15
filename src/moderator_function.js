export async function kick_id(message, args) {
    if (!message.member.permissions.has('KICK_MEMBERS'))
        return message.reply('tu ne peux pas utiliser cette commande ptit branleur');

    if (args.length === 0)
        return message.reply('il manque l\'identifiant');

    const member = await message.guild.members.cache.get(args[0]);
    if (member) {
        member.kick()
            .then((member) => message.channel.send(`${member}, t'es expulsé et ouais frérot`))
            .catch((err) => message.channel.send('tu ne m\' as pas donné la permission :('));
    } else {
        message.channel.send('je ne l\'ai pas trouvé ce fdp')
    }
}

export async function ban_id(message, args) {
    if (!message.member.permissions.has('BAN_MEMBERS'))
        return message.reply('tu ne peux pas utiliser cette commande sale étron');

    if (args.length === 0)
        return message.reply('il manque l\'identifiant');

    const user = await message.guild.members.ban(args[0]);
    if (user) {
        user.then((member) => message.channel.send(`${member}, t'es banni et ouais frérot`))
            .catch((err) => message.channel.send('tu ne m\' as pas donné la permission :('));
    } else {
        message.channel.send('je ne l\'ai pas trouvé ce fdp')
    }
}