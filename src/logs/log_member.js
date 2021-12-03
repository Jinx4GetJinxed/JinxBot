function log_channel(client){
	return client.channels.cache.find(channel => channel.name === "📜-ʟᴏɢꜱ-💬")
}

async function log_member_kick(member){
	const channel = log_channel(client);
    const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK'
	});

	const kickLog = fetchedLogs.entries.first();

	if (!kickLog) return console.log(`${member.user.tag} a quitté le serveur`);

	const { executor, target } = kickLog;

	if (target.id === member.id) {
		console.log(`${member.user.tag} a quitté la guilde, et a été viré par ${executor.tag}`);
	} else {
		console.log(`${member.user.tag} a quitté la guilde, la recherche des journaux d'audit n'a pas été concluante.`);
	}
}

async function log_member_add(client, member){
	const channel = log_channel(client)
	return channel.send({
		embeds: [{
			color: "#00A86B",
			description: `\`\`\`py\n😈 | "Nouveau membre"\`\`\`
						\`${member.user.tag}\` a rejoint le serveur !!!`
		}]
	})
}

async function log_member_remove(client, member){
	const channel = log_channel(client)
	return channel.send({
		embeds: [{
			color: "#BF4F51",
			description: `\`\`\`xl\n😧 | "Un membre est parti"\`\`\`
						\`${member.user.tag}\` a quitté le serveur!!!`
		}]
	})
}

module.exports = { log_member_kick, log_member_add, log_member_remove }