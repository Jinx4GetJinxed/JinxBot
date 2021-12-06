function log_channel_message(client, num) {
  switch (num) {
    case 1:
      return client.channels.cache.find(
        (channel) => channel.name === "🄼🄴🅂🅂🄰🄶🄴"
      );
      break;
  }
}

function log_message_delete(client, message) {
  const channel = log_channel_message(client, 1);
  return channel.send({
    embeds: [
      {
        author: {
          name: message.author.user,
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
