function log_channel(client, num) {

	switch (num) {
		case 1:
			return client.channels.cache.find(channel => channel.name === "😈-🇧🇮🇪🇳🇻🇪🇳🇺-😧")
			break;

		case 2:
			return client.channels.cache.find(channel => channel.name === "🇰🇮🇨🇰")
			break;

		case 3:
			return client.channels.cache.find(channel => channel.name === "🇧🇦🇳")
			break;
	}
}
async function log_member_kick(client, member) {
	const channel = log_channel(client, 2);
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK'
	});

	const kickLog = fetchedLogs.entries.first();

	if (!kickLog) return console.log(`${member.user.tag} a quitté le serveur`);

	const { executor, target } = kickLog;
	if (Date.now() - kickLog.createdTimestamp < 5000) {
		if (target.id === member.id) {
			return channel.send({
				embeds: [{
					color: "#cc0e4a",
					description: `\`\`\`xl\n⚖️ | 'Un membre a été expulsé'\`\`\`
					\`${member.user.tag}\` a été expulsé par \`${executor.tag}\``,
					timeStamp: kickLog.createdTimestamp
				}]
			})
		} else {
			return channel.send({
				embeds: [{
					color: "#cc0e4a",
					description: `\`\`\`xl\n⚖️ | 'Un membre a été expulsé'\`\`\`
					\`${member.user.tag}\` a quitté la guilde, la recherche des journaux d'audit n'a pas été concluante.`
				}]
			})
		}
	}
}

async function log_member_ban_add(client, member) {
	const channel = log_channel(client, 3);
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD'
	});

	const banLog = fetchedLogs.entries.first();

	if (!banLog) return console.log(`${member.user.tag} a été banni`);
	const { executor, target } = banLog;
	if (Date.now() - banLog.createdTimestamp < 5000) {
		return channel.send({
			embeds: [{
				color: "#cc0e4a",
				description: `\`\`\`xl\n⚖️ | 'Un membre a été banni'\`\`\`
					\`${target.tag}\` a été banni par \`${executor.tag}\``,
				timeStamp: new Date(banLog.createdTimestamp)
			}]
		})
	}
}

async function log_member_ban_remove(client, member) {
	const channel = log_channel(client, 3);
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_REMOVE'
	});

	const banLog = fetchedLogs.entries.first();

	if (!banLog) return console.log(`${member.user.tag} a été débanni`);
	const { executor, target } = banLog;
	if (Date.now() - banLog.createdTimestamp < 5000) {
		return channel.send({
			embeds: [{
				color: "#66ff66",
				description: `\`\`\`xl\n⚖️ | 'Un membre a été débanni'\`\`\`
					\`${target.tag}\` a été débanni par \`${executor.tag}\``,
				timeStamp: new Date(banLog.createdTimestamp)
			}]
		})
	}
}


async function log_member_add(client, member) {
	const channel = log_channel(client, 1)
	return channel.send({
		embeds: [{
			color: "#00A86B",
			description: `\`\`\`py\n😈 | "Nouveau membre"\`\`\`
						\`${member.user.tag}\` a rejoint le serveur !!!`
		}]
	})
}

async function log_member_remove(client, member) {
	const channel = log_channel(client, 1)
	return channel.send({
		embeds: [{
			color: "#BF4F51",
			description: `\`\`\`xl\n😧 | "Un membre est parti"\`\`\`
						\`${member.user.tag}\` a quitté le serveur!!!`
		}]
	})
}

module.exports = { log_member_kick, log_member_add, log_member_remove, log_member_ban_add, log_member_ban_remove }