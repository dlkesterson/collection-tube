const next = require('next');
const express = require('express');
const { models } = require('./db');
const ytpl = require('ytpl');
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

// cron.schedule('*/2 * * * *', async () => {
// 	const channel =  await models.Channel.findOne({
// 		where: {
// 			id: '3'
// 		}
// 	});
// 	const channelVideos = await models.Video.findAll({
// 		where: {
// 			channel_id: channel.channel_id
// 		}
// 	});
// 	const channelYTPlaylist = await ytpl(channel.channel_url);
// 	console.log('\n#___CH CH CH CHRON JOBBBB!___#');
// 	console.log('channel 3\'s name: ' + channel['name'] + '\n');
// 	console.log('first video found for channel on YT: ' + channelYTPlaylist.videos[0]['id']);
// 	console.log(channelYTPlaylist.videos);
// 	if (channelVideos.length > 0 && channelVideos[0]['video_id'] !== channelYTPlaylist.videos[0]['id']) {
// 		console.log('\nnew videos are available to grab from YT!');
// 		console.log('newest from YT: ' + channelYTPlaylist.videos[0]['title']);
// 		console.log('newest from local database: ' + channelVideos[0]['title'] + '\n');
// 	} else {
// 		console.log('no new videos found for ' + channel['name']);
// 	}
// });

app.prepare().then(() => {
    // await assertDatabaseConnectionOk();

	expressServer.all('*', (req, res) => {
		return handle(req, res);
	});

    http.createServer(expressServer).listen(ports.http);
    https.createServer(options, expressServer).listen(ports.https);
});
