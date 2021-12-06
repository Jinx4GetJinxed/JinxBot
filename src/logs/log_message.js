function log_channel_message(client, num) {
  switch (num) {
    case 1:
      return client.channels.cache.find(
        (channel) => channel.name === "🄼🄴🅂🅂🄰🄶🄴"
      );
      break;
  }
}

async function log_message_delete(client, message) {
  if (message.partial) {
    try {
      await message.fetch();
    } catch (error) {
      console.error("Une erreur est apparue à cause du fetch:", error);
      return;
    }
  }

  if (message.author.bot || !message.guild) return;
  const channel = log_channel_message(client, 1);
  return channel.send({
    embeds: [
      {
        author: {
          name: message.author.username,
          icon_url: message.author.avatarURL(),
        },
        color: "#9c2008",
        description: `\`\`\`xl\n📜 | 'message supprimé'\`\`\`
                Un message a été supprimé: \`${message.cleanContent}\`
                dans le channel: \`${message.channel.name}\``,
      },
    ],
  });
}

module.exports = { log_message_delete };
