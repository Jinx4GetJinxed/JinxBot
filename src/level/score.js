function scorePLayer(message) {
  let score = client.getScore.get(message.author.id, message.guild.id);

  if (!score) {
    score = {
      id: `${message.guild.id}-${message.author.id}`,
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1,
    };
  }

  // Increment the score
  score.points++;

  // Calculate the current level through MATH OMG HALP.
  const curLevel = Math.floor(0.1 * Math.sqrt(score.points));

  // Check if the user has leveled up, and let them know if they have:
  if (score.level < curLevel) {
    // Level up!
    score.level++;
    message.reply(
      `You've leveled up to level **${curLevel}**! Ain't that dandy?`
    );
  }

  client.setScore.run(score);
}
