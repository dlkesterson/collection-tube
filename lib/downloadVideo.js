const ytdl = require('ytdl-core');
const fs = require('fs');
const { models } = require('@/db');
const wsServer = require('./websockets');

function downloadVideo(video_db_id) {

	// const { id } = req.params;
	const video = await models.Video.findByPk(video_db_id);
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

	wsServer.clients.forEach((client) => {
		client.send(
			'in download video ExpressJS request, ID passed is ' + video_db_id
		);
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
				`video #${id} is ${(
					(downloadProgress / downloadSize) *
					100
				).toFixed(2)}% complete\n`
			);
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
}