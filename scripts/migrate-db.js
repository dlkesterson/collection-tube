const path = require('path');
const envPath = path.resolve(process.cwd(), '.env.local');

console.log({ envPath });

require('dotenv').config({ path: envPath });

const mysql = require('serverless-mysql');

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
		console.log('migration 000 ran successfully');
	} catch (e) {
		console.error(
			'could not run migration, double check your credentials.'
		);
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

async function runMigrationNextAuthSchema() {
	try {
		await query(`
        CREATE TABLE IF NOT EXISTS accounts (
            id INT NOT NULL AUTO_INCREMENT,
            compound_id VARCHAR(255) NOT NULL,
            user_id INTEGER NOT NULL,
            provider_type VARCHAR(255) NOT NULL,
            provider_id VARCHAR(255) NOT NULL,
            provider_account_id VARCHAR(255) NOT NULL,
            refresh_token TEXT,
            access_token TEXT,
            access_token_expires TIMESTAMP(6),
            created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            PRIMARY KEY (id)
          );
          CREATE TABLE IF NOT EXISTS sessions (
            id INT NOT NULL AUTO_INCREMENT,
            user_id INTEGER NOT NULL,
            expires TIMESTAMP(6) NOT NULL,
            session_token VARCHAR(255) NOT NULL,
            access_token VARCHAR(255) NOT NULL,
            created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            PRIMARY KEY (id)
          );
          CREATE TABLE IF NOT EXISTS users (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            email VARCHAR(255),
            email_verified TIMESTAMP(6),
            image VARCHAR(255),
            created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            PRIMARY KEY (id)
          );
          CREATE TABLE IF NOT EXISTS verification_requests (
            id INT NOT NULL AUTO_INCREMENT,
            identifier VARCHAR(255) NOT NULL,
            token VARCHAR(255) NOT NULL,
            expires TIMESTAMP(6) NOT NULL,
            created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            PRIMARY KEY (id)
          );
          CREATE UNIQUE INDEX compound_id ON accounts(compound_id);
          CREATE INDEX provider_account_id ON accounts(provider_account_id);
          CREATE INDEX provider_id ON accounts(provider_id);
          CREATE INDEX user_id ON accounts(user_id);
          CREATE UNIQUE INDEX session_token ON sessions(session_token);
          CREATE UNIQUE INDEX access_token ON sessions(access_token);
          CREATE UNIQUE INDEX email ON users(email);
          CREATE UNIQUE INDEX token ON verification_requests(token);
      `);
		console.log('migration for next-auth schema ran successfully');
	} catch (e) {
		console.error('could not run migration for next-auth schema');
		process.exit(1);
	}
}

migrate()
	.then(runMigrationNextAuthSchema())
	.then(() => process.exit());
