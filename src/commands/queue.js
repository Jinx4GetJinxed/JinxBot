const { randomColor } = require("../fonctions/random_color");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

// Constants

const backId = "back";
const forwardId = "forward";
const backButton = new MessageButton({
  style: "DANGER",
  label: "⬅️  Avant",
  customId: backId,
});
const forwardButton = new MessageButton({
  style: "SUCCESS",
  label: "Après  ➡️",
  customId: forwardId,
});

module.exports = {
  name: "queue",
  aliases: ["q", "queue"],
  run: async (client, Distube, message, args) => {
    const queue = Distube.getQueue(message.guild.id);
    if (!queue)
      return message.channel
        .send({
          embeds: [
            {
              color: randomColor(),
              description: `\`\`\`py\n${client.emotes.error} | "Il n'y a rien dans la file d'attente pour le moment!"\`\`\``,
            },
          ],
        })
        .then((msg) => {
          setTimeout(() => msg.delete(), 10000);
        });

    // Put the following code wherever you want to send the embed pages:
    const { author } = message;
    const q = queue.songs
      .map(
        (song, i) =>
          `${
            i === 0
              ? `\`Je joue:  ${song.name}\` - \`${song.formattedDuration}\`\n`
              : `\`${i + 1}.  ${song.name}\` - \`${song.formattedDuration}\``
          }`
      )
      .join("\n");
    if (queue.songs.length <= 10) {
      message.channel.send({
        embeds: [
          {
            color: randomColor(),
            description: `\`\`\`cs\n${client.emotes.queue} | "File d'attente du serveur"\`\`\`\n${q}`,
          },
        ],
      });
    } else {
      /**
       * Creates an embed with guilds starting from an index.
       * @param {number} start The index to start from.
       * @returns {Promise<MessageEmbed>}
       */
      const generateEmbed = async (start) => {
        const current = queue.songs.slice(start, start + 10);

        const q = current
          .map(
            (song, i) =>
              `${
                start + i === 0
                  ? `\`Je joue:  ${song.name}\` - \`${song.formattedDuration}\`\n`
                  : `\`${start + (i + 1)}.  ${song.name}\` - \`${
                      song.formattedDuration
                    }\``
              }`
          )
          .join("\n");

        // You can of course customise this embed however you want
        return new MessageEmbed({
          color: randomColor(),
          description: `\`\`\`cs\n${
            client.emotes.queue
          } | "File d'attente du serveur"\`\`\`\n\`Musiques:\` \`${
            start + 1
          }\` - \`${start + current.length}\` (\`${
            queue.songs.length
          }\` musiques)\n
          ${q}`,
        });
      };

      const canFitOnOnePage = false;
      const embedMessage = await message.channel.send({
        embeds: [await generateEmbed(0)],
        components: canFitOnOnePage
          ? []
          : [new MessageActionRow({ components: [forwardButton] })],
      });

      // Collect button interactions (when a user clicks a button),
      // but only when the button as clicked by the original message author
      const collector = embedMessage.createMessageComponentCollector({
        filter: ({ user }) => user.id === author.id,
      });

      let currentIndex = 0;
      collector.on("collect", async (interaction) => {
        // Increase/decrease index
        interaction.customId === backId
          ? (currentIndex -= 10)
          : (currentIndex += 10);
        // Respond to interaction by updating message with new embed
        await interaction.update({
          embeds: [await generateEmbed(currentIndex)],
          components: [
            new MessageActionRow({
              components: [
                // back button if it isn't the start
                ...(currentIndex ? [backButton] : []),
                // forward button if it isn't the end
                ...(currentIndex + 10 < queue.songs.length
                  ? [forwardButton]
                  : []),
              ],
            }),
          ],
        });
      });
    }
  },
};
