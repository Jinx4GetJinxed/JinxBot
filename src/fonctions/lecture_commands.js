const { no_cmd, cmd_no_channel } = require("./moderator_function")

function run_command(message, PREFIX, commands, aliases, emotesError, client, Distube) {
  const prefix1 = PREFIX;
  const Args = message.content.slice(prefix1.length).trim().split(/ +/g);
  const command = Args.shift().toLowerCase();
  const cmd =
    commands.get(command) ||
    commands.get(aliases.get(command));
  if (!cmd) return no_cmd(message, emotesError);
  if (cmd.inVoiceChannel && !message.member.voice.channel)
    return cmd_no_channel(message, emotesError);
  try {
    cmd.run(client, Distube, message, Args);
  } catch (e) {
    console.error(e);
    message.reply(`Erreur: ${e}`);
  }
}

module.exports = { run_command }