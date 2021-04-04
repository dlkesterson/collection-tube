// ██████╗  ██████╗ ██╗    ██╗███╗   ██╗██╗      ██████╗  █████╗ ██████╗     ██╗███╗   ███╗ █████╗  ██████╗ ███████╗
// ██╔══██╗██╔═══██╗██║    ██║████╗  ██║██║     ██╔═══██╗██╔══██╗██╔══██╗    ██║████╗ ████║██╔══██╗██╔════╝ ██╔════╝
// ██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║██║     ██║   ██║███████║██║  ██║    ██║██╔████╔██║███████║██║  ███╗█████╗
// ██║  ██║██║   ██║██║███╗██║██║╚██╗██║██║     ██║   ██║██╔══██║██║  ██║    ██║██║╚██╔╝██║██╔══██║██║   ██║██╔══╝
// ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║███████╗╚██████╔╝██║  ██║██████╔╝    ██║██║ ╚═╝ ██║██║  ██║╚██████╔╝███████╗
// ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝

require('dotenv').config();

const cloudinary = require('cloudinary').v2;
import { query } from '@/lib/db';

cloudinary.config({
	cloud_name: process.env.cloudinary_cloud_name,
	api_key: process.env.cloudinary_api_key,
	api_secret: process.env.cloudinary_api_secret,
});

export const downloadImage = async (item) => {
	console.log('downloadImage()');

	console.log(item);
	let url = item.url || '';
	if (!url.length) {
		return res.status(400).json({ message: 'avatar url` is required' });
	}

	console.log(`saving image ${url}`);
	return new Promise(function (resolve, reject) {
		cloudinary.uploader.upload(
			url,
			{
				folder: 'ytdl-gui-v2',
				colors: true,
			},
			(error, result) => {
				if (error) console.log(error);

				console.log('cloudinary save results:');
				console.log(result);

				if (result) {
					resolve(saveResult(result, item));
				} else {
					reject(
						console.error('result was no good, nothing to save :(')
					);
				}
			}
		);
	});
};

async function saveResult(result, item) {
	let color_primary = result.colors[0][0];
	let color_list = result.colors
		.slice(1, 6)
		.map((curr) => {
			return curr[0].replace(',', '');
		})
		.join();

	console.log('colors: ' + color_list);
	console.log('color_primary: ' + color_primary);
	console.log('result.url: ' + result.url);
	console.log('item.id: ' + item.id);

	try {
		const results = await query(
			`
        UPDATE channels
        SET avatar = ?, color_primary = ?, color_list = ?
        WHERE id = ?
        `,
			[result.url, color_primary, color_list, item.id]
		);

		return results;
	} catch (e) {
		console.log(e.message);
	}
}

export default downloadImage;
