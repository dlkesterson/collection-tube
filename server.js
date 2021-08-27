const next = require('next');
const express = require('express');
const { models } = require('./db');
const ytdl = require('ytdl-core');
const wsServer = require('./lib/websockets');
const saveChannel = require('./lib/saveChannel');
// const ytpl = require('ytpl');
// const Channel = require('./models/channel');
const http = require('http');
const https = require('https');
const fs = require('fs');
// const cron = require('node-cron');
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

if (!fs.existsSync('./public/data/')) {
    fs.mkdirSync('./public/data/');
}

app.prepare().then(() => {
    expressServer.get('/download/:id', async function (req, res) {
        const { id } = req.params;
        const video = await models.Video.findByPk(id);
        const updatedVideo = {
            ...video,
            downloaded: 1,
            downloadedAt: Math.floor(new Date().getTime() / 1000)
        };
        const dir = `./public/data/${video.channel_id}`;
        const videoPath = `${dir}/${video.video_id}.mp4`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        wsServer.clients.forEach((client) => {        
            client.send(
                JSON.stringify({ 
                    status: 'starting', 
                    data: { 
                        message: `in download video ExpressJS request, ID passed is: ${id}`
                    } }));

            console.log('downloading video ' + video.video_url);
            const downloadStream = ytdl(video.video_url);
            let downloadProgress = 0;
            let downloadSize = 0;

            downloadStream.on('response', function (data) {
                downloadSize = data.headers['content-length'];
                console.log('download size: ' + data.headers['content-length']);
            });

            downloadStream.on('data', function (data) {
                downloadProgress += data.length;
                client.send(
                    JSON.stringify({ 
                        status: 'progress', 
                        data: { 
                            message: `video #${id} is ${(
                                (downloadProgress / downloadSize) *
                                100
                            ).toFixed(2)}% complete\n`
                        } }));
            });

            downloadStream.pipe(fs.createWriteStream(videoPath));

            downloadStream.on('end', function () {
                console.log('\n\ndownload finished!!!!!!!!\n\n');

                models.Video.update(updatedVideo, {
                    where: {
                        id
                    }
                });

                res.status(200).send({ ok: true, message: 'done!' });
            });
        });
    });

    expressServer.get('/websockets/:id', async function (req, res) {
        const result = await saveChannel(req.params.id);
        wsServer.clients.forEach((client) => {
            if (result && result.channel) {
                client.send('channel: ' + result.channel.channel_url);
                res.status(200).send(result);
            } else {
                res.status(500).send(result);
            }
        });
    });

    expressServer.all('*', (req, res) => {
        return handle(req, res);
    });

    wsServer.on('connection', (socket) => {
        let responseCount = 0;
        console.log('websocket connection!');
        socket.on('message', function incoming(message) {
            try {
                const data = JSON.parse(message);
                responseCount++;
                console.log('got JSON parsed data:');
                console.log(data);
                console.log(data.message);
            } catch (e) {
                console.log(`error occurred when receiving client websocket data: ${e.message}`);
            }
            console.log('received: %s', message);
            socket.send(JSON.stringify({ status: 'success', data: { message: `#${responseCount} rand num: ${(Math.random() * 100).toFixed(2)}` } }));
        });
    });

    http.createServer(expressServer)
        .listen(ports.http)
        .on('upgrade', (request, socket, head) => {
            console.log('upgrade event');
            wsServer.handleUpgrade(request, socket, head, (socket) => {
                wsServer.emit('connection', socket, request);
            });
        });
    https.createServer(options, expressServer).listen(ports.https);
});
