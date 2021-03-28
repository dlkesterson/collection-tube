const path = require("path");
const envPath = path.resolve(process.cwd(), ".env.local");

console.log({ envPath });

require("dotenv").config({ path: envPath });

const mysql = require("serverless-mysql");

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
});

async function query(q) {
  try {
    const results = await db.query(q);
    await db.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  try {
    await query(`
    CREATE TABLE IF NOT EXISTS channels (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name CHAR(255) DEFAULT NULL,
      avatar VARCHAR(255) DEFAULT NULL,
      channel CHAR(255) DEFAULT NULL,
      channel_url VARCHAR(255) NOT NULL,
      yt_user CHAR(255) DEFAULT NULL,
      yt_user_url VARCHAR(255) DEFAULT NULL,
      total_visits INT DEFAULT NULL,
      total_items INT DEFAULT NULL,
      description TEXT DEFAULT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `);
    console.log("migration 000 ran successfully");
  } catch (e) {
    console.error("could not run migration, double check your credentials.");
    process.exit(1);
  }
}

// async function runMigration001() {
//   try {
//     await query(`
//       ALTER TABLE entries ADD COLUMN published BOOL DEFAULT FALSE
//     `);
//     console.log("migration 001 ran successfully");
//   } catch (e) {
//     console.error("could not run migration, double check your credentials.");
//     process.exit(1);
//   }
// }

migrate()
  // .then(runMigration001())
  .then(() => process.exit());
