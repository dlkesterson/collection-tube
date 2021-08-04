const next = require('next');
const express = require('express');
// const db = require('./db');
const http = require('http');
const https = require('https');
const fs = require('fs');

const ports = {
	http: 3080,
	https: 3443,
};
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

const options = {
	key: fs.readFileSync('localhost.key'),
	cert: fs.readFileSync('localhost.crt'),
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

	server.all('*', (req, res) => {
		return handle(req, res);
	});

	http.createServer(server).listen(ports.http);
	https.createServer(options, server).listen(ports.https);
});
