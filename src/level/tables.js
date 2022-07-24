const SQLite = require("better-sqlite3");
const sql = new SQLite("./scores.sqlite");

function table_prep() {
    return sql
        .prepare(
            "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';"
        )
        .get();
}

function create_table() {
    sql
        .prepare(
            "CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);"
        )
        .run();
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
}

function getSanction_fct() {
    return sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
}

function setSanction_fct() {
    return sql.prepare(
        "INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);"
    );
}

module.exports = { table_prep, create_table, getSanction_fct, setSanction_fct };