export function kick(){
    if (!message.member.permissions.has('KICK_MEMBERS'))
        return message.reply('tu ne peux pas utiliser cette commande ptit branleur');

    if (args.length === 0)
        return message.reply('il manque l\'identifiant');

    const member = message.guild.members.cache.get(args[0]);
    if (member) {
        member.kick()
            .then((member) => message.channel.send(`${member}, t'es expulsé et ouais frérot`))
            .catch((err) => message.channel.send('tu ne m\' as pas donné la permission :('));
    } else {
        message.channel.send('je ne l\'ai pas trouvé ce fdp')
    }
}