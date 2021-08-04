const next = require('next');
const express = require('express');
// const db = require('./db');
const http = require('http');
const https = require('https');
const fs = require('fs');
const cron = require('node-cron');

const ports = {
    http: 3080,
    https: 3443
};
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const expressServer = express();

const options = {
    key: fs.readFileSync('localhost.key'),
    cert: fs.readFileSync('localhost.crt')
};

// async function assertDatabaseConnectionOk() {
// 	console.log(`Checking database connection...`);
// 	try {
// 		await db.authenticate();
// 		console.log('Database connection OK!');
// 	} catch (error) {
// 		console.log('Unable to connect to the database:');
// 		console.log(error.message);
// 		process.exit(1);
// 	}
// }
// if (!fs.existsSync(`./public/data`)) {
// 	fs.mkdirSync(`./public/data`);
// }

app.prepare().then(() => {
    // await assertDatabaseConnectionOk();

	cron.schedule('*/2 * * * *', () => {
		console.log('running a task every minute');
		fetch(`https://localhost:3000/api/get-channel-latest/3`)
	});

    http.createServer(expressServer).listen(ports.http);
    https.createServer(options, expressServer).listen(ports.https);
});
