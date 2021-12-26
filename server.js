const next = require('next');
const express = require('express');
const { models } = require('./db');
const ytdl = require('ytdl-core');
const wsServer = require('./lib/websockets');
const saveSubscription = require('./lib/saveSubscription');
// const ytpl = require('ytpl');
// const Subscription = require('./models/subscription');
const http = require('http');
const https = require('https');
const fs = require('fs');
// const cron = require('node-cron');
const ports = {
    http: 3091,
    https: 3779
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
// 	const subscription =  await models.Subscription.findOne({
// 		where: {
// 			id: '3'
// 		}
// 	});
// 	const subscriptionVideos = await models.Video.findAll({
// 		where: {
// 			subscription_id: subscription.subscription_id
// 		}
// 	});
// 	const subscriptionYTPlaylist = await ytpl(subscription.subscription_url);
// 	console.log('\n#___CH CH CH CHRON JOBBBB!___#');
// 	console.log('subscription 3\'s name: ' + subscription['name'] + '\n');
// 	console.log('first video found for subscription on YT: ' + subscriptionYTPlaylist.videos[0]['id']);
// 	console.log(subscriptionYTPlaylist.videos);
// 	if (subscriptionVideos.length > 0 && subscriptionVideos[0]['video_id'] !== subscriptionYTPlaylist.videos[0]['id']) {
// 		console.log('\nnew videos are available to grab from YT!');
// 		console.log('newest from YT: ' + subscriptionYTPlaylist.videos[0]['title']);
// 		console.log('newest from local database: ' + subscriptionVideos[0]['title'] + '\n');
// 	} else {
// 		console.log('no new videos found for ' + subscription['name']);
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
        const dir = `./public/data/${video.subscription_id}`;
        const videoPath = `${dir}/${video.video_id}.mp4`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        console.log(wsServer.clients);

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

    expressServer.get('/websockets/subscription/:id', async function (req, res) {
        const result = await saveSubscription(req.params.id);
        wsServer.clients.forEach((client) => {
            if (result && result.subscription) {
                client.send('subscription: ' + result.subscription.subscription_url);
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
        let responseCount = 1;
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
