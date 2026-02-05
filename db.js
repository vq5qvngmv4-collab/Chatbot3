import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./chatbot.sqlite");

export function initDb() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        datetime TEXT,
        people INTEGER,
        created_at TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        phone TEXT,
        created_at TEXT
      )
    `);
  });
}
