const {
    score_add,
    show_level,
    score_give,
    remove_points,
    top_rank,
    show_level_member,
} = require("../level/score");
const { clear_command } = require("./clear_fonction");
const {
    Consignes1,
    Consignes2,
    Consignes3,
    Consignes4,
    Consignes5,
} = require("./consignes_function");
const { run_command } = require("./lecture_commands");
const {
    not_allowed_cmd,
    kick_id,
    ban_id,
    wrong_channel_cmd1,
    no_cmd,
} = require("./moderator_function");
const config = require("../config.json");

const PREFIX = "jinx!";

function Gold(message) {
    message.react("<a:Gold:776099501051871242>");
}

function Hello(message) {
    message.reply("tqt pas je suis lÃ");
}

async function creationMessage(client, message) {
    if (message.author.bot || !message.guild) return;
    score_add(client, message, message.guild);

    const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

    switch (true) {
        case message.content.toLowerCase().startsWith(PREFIX):
            setTimeout(() => message.delete(), 1000);
            switch (CMD_NAME) {
                case "consignes":
                    if (message.member.permissions.has("ADMINISTRATOR")) {
                        if (message.channel.id === "481477520236216350") {
                            Consignes1(message);
                            Consignes2(message);
                            Consignes3(message);
                            Consignes4(message);
                            Consignes5(message);
                        }
                    } else {
                        not_allowed_cmd(message, client.emotes.error);
                    }
                    break;

                case "dÃ©gage-moi":
                    if (message.member.permissions.has("ADMINISTRATOR")) {
                        kick_id(message, args);
                    } else {
                        not_allowed_cmd(message, client.emotes.error);
                    }
                    break;

                case "ban-moi":
                    if (message.member.permissions.has("ADMINISTRATOR")) {
                        ban_id(message, args);
                    } else {
                        not_allowed_cmd(message, client.emotes.error);
                    }
                    break;

                case "level":
                    if (message.channel.id === "833824151671930920") {
                        if (args == null) {
                            show_level(client, message);
                        } else if (args != null) {
                            show_level_member(client, message, args)
                        }
                    } else {
                        wrong_channel_cmd1(message, client.emotes.error);
                    }
                    break;

                case "give":
                    if (message.member.permissions.has("ADMINISTRATOR")) {
                        if (message.channel.id === "833824151671930920") {
                            score_give(message, client, args);
                        } else {
                            wrong_channel_cmd1(message, client.emotes.error);
                        }
                    } else {
                        not_allowed_cmd(message, client.emotes.error);
                    }
                    break;

                case "remove":
                    if (message.member.permissions.has("ADMINISTRATOR")) {
                        if (message.channel.id === "833824151671930920") {
                            remove_points(message, client, args);
                        } else {
                            wrong_channel_cmd1(message, client.emotes.error);
                        }
                    } else {
                        not_allowed_cmd(message, client.emotes.error);
                    }
                    break;

                case "rank":
                case "top":
                    if (message.channel.id === "833824151671930920") {
                        top_rank(
                            message.channel.id,
                            message,
                            client,
                            client.emotes.error,
                            message.guild
                        );
                    } else {
                        wrong_channel_cmd1(message, client.emotes.error);
                    }
                    break;

                case "clear":
                case "c":
                    setTimeout(() => clear_command(message, args[0]), 2000);
                    break;

                default:
                    no_cmd(message, client.emotes.error);
                    break;
            }
            break;

        case message.content.toLowerCase().startsWith(config.prefix):
            setTimeout(() => message.delete(), 1000);
            if (message.channel.id === "474553482691608597") {
                run_command(
                    message,
                    config.prefix,
                    client.commands,
                    client.aliases,
                    client.emotes.error,
                    client,
                    client.distube
                );
            } else {
                wrong_channel_cmd(message, client.emotes.error);
            }
            break;

        case message.content.toLowerCase().includes("gold"):
            Gold(message);
            break;

        case message.content.toLowerCase().includes("hello"):
            Hello(message);
            break;
    }
}

module.exports = { Gold, Hello, creationMessage };