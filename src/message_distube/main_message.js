const { randomColor } = require("../fonctions/random_color");

function message_distube(Distube, Emotes) {
  const statut = (queue) =>
    `Volume: \`${queue.volume}%\` | Filtre: \`${
      queue.filters.join(", ") || "Non"
    }\` | Boucle: \`${
      queue.repeatMode
        ? queue.repeatMode === 2
          ? "Toute la file d'attente"
          : "Cette Musique"
        : "Non"
    }\` | Lecture automatique: \`${queue.autoplay ? "Oui" : "Non"}\``;
  Distube.on("playSong", (queue, song) =>
    queue.textChannel.send({
      embeds: [
        {
          color: randomColor(),
          description: `\`\`\`xl\n${Emotes.play} | 'Lecture:'\`\`\` \`${song.name}\` - \`${song.formattedDuration}\``,
        },
      ],
    })
  )
    .on("addSong", (queue, song) =>
      queue.textChannel.send({
        embeds: [
          {
            color: randomColor(),
            description: `\`\`\`xl\n${
              Emotes.success
            } | 'Ajout de la musique:'\`\`\` \`${song.name}\` - \`${
              song.formattedDuration
            }\` à la file d'attente par ${song.user}\n${statut(queue)}`,
          },
        ],
      })
    )
    .on("addList", (queue, playlist) =>
      queue.textChannel.send({
        embeds: [
          {
            color: randomColor(),
            description: `\`\`\`xl\n${
              Emotes.success
            } | 'Ajout de la playlist:'\`\`\` \`${playlist.name}\` (${
              playlist.songs.length
            } musiques) à la file d'attente\n${statut(queue)}`,
          },
        ],
      })
    )
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
      let i = 0;
      message.channel.send({
        embeds: [
          {
            color: randomColor(),
            description: `\`\`\`xl\n'Choisissez une option parmi les suivantes'\`\`\`\n${result
              .map(
                (song) =>
                  `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
              )
              .join(
                "\n"
              )}\`\`\`xl\n'Entrez autre chose ou attendez 60 secondes pour annuler'\`\`\``,
          },
        ],
      });
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) =>
      message.channel.send({
        embeds: [
          {
            color: randomColor(),
            description: `\`\`\`xl\n${Emotes.error} | Searching canceled\`\`\``,
          },
        ],
      })
    )
    .on("error", (channel, e) => {
      channel.send({
        embeds: [
          {
            color: randomColor(),
            description: `\`\`\`xl\n${Emotes.error} | 'Une erreur a été rencontrée:' ${e}\`\`\``,
          },
        ],
      });
      console.error(e);
    })
    .on("empty", (message) =>
      message.channel.send({
        embeds: [
          {
            color: randomColor(),
            description: `\`\`\`xl\n'Le canal vocal est vide donc je le quitte !'\`\`\``,
          },
        ],
      })
    )
    .on("searchNoResult", (message) =>
      message.channel.send({
        embeds: [
          {
            color: randomColor(),
            description: `\`\`\`xl\n${Emotes.error} | Aucun résultat trouvé !\`\`\``,
          },
        ],
      })
    )
    .on("finish", (queue) =>
      queue.textChannel.send({
        embeds: [
          {
            color: randomColor(),
            description: `\`\`\`xl\n'Terminé!'\`\`\``,
          },
        ],
      })
    );
}

module.exports = { message_distube };
