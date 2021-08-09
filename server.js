const next = require('next');
const express = require('express');
const { models } = require('./db');
// const Channel = require('./models/channel');
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

	expressServer.all('*', (req, res) => {
		return handle(req, res);
	});

	cron.schedule('*/2 * * * *', async () => {
		const channel =  await models.Channel.findOne({
			where: {
				id: '1'
			},
			order: [['updatedAt', 'DESC']]
		});
		console.log('\n#___CH CH CH CHRON JOBBBB!___#');
		console.log('channel 1\'s name: ' + channel['name'] + '\n');
	});

    http.createServer(expressServer).listen(ports.http);
    https.createServer(options, expressServer).listen(ports.https);
});
