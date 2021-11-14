const SQLite = require("better-sqlite3");
const client = require("discord.js")
const sql = new SQLite("./scores.sqlite");

function preparation_table() {
  // Check if the table "points" exists.
  const table = sql
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';"
    )
    .get();
  if (!table["count(*)"]) {
    // If the table isn't there, create it and setup the database correctly.
    sql
      .prepare(
        "CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);"
      )
      .run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  // And then we have two prepared statements to get and set the score data.
  client.getScore = sql.prepare(
    "SELECT * FROM scores WHERE user = ? AND guild = ?"
  );
  client.setScore = sql.prepare(
    "INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);"
  );
}

module.exports = { preparation_table };
