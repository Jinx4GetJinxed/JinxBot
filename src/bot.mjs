/**
 * @author Id Brahim Hakim
 *
 * @import "dotenv/config"
 * @import "discord.js"
 */
import {
  lecteur_distube,
  lecteur_fs,
  lecteur_guilBanRemove,
  lecteur_guildBanAdd,
  lecteur_guildMemberAdd,
  lecteur_guildMemberRemove,
  lecteur_messageCreate,
  lecteur_messageDelete,
  lecteur_messageReactionAdd,
  lecteur_ready,
  lecteur_token,
} from "./listeners/lecteurs.js";

lecteur_distube();
lecteur_fs();
lecteur_guilBanRemove();
lecteur_guildBanAdd();
lecteur_guildMemberAdd();
lecteur_guildMemberRemove();
lecteur_messageCreate();
lecteur_messageDelete();
lecteur_messageReactionAdd();
lecteur_ready();
lecteur_token();
