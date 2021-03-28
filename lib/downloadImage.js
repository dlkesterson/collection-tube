// ██████╗  ██████╗ ██╗    ██╗███╗   ██╗██╗      ██████╗  █████╗ ██████╗     ██╗███╗   ███╗ █████╗  ██████╗ ███████╗
// ██╔══██╗██╔═══██╗██║    ██║████╗  ██║██║     ██╔═══██╗██╔══██╗██╔══██╗    ██║████╗ ████║██╔══██╗██╔════╝ ██╔════╝
// ██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║██║     ██║   ██║███████║██║  ██║    ██║██╔████╔██║███████║██║  ███╗█████╗
// ██║  ██║██║   ██║██║███╗██║██║╚██╗██║██║     ██║   ██║██╔══██║██║  ██║    ██║██║╚██╔╝██║██╔══██║██║   ██║██╔══╝
// ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║███████╗╚██████╔╝██║  ██║██████╔╝    ██║██║ ╚═╝ ██║██║  ██║╚██████╔╝███████╗
// ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝

require('dotenv').config();

// const Video = require('../models/video');
// const Channel = require('../models/channel');
const cloudinary = require('cloudinary').v2;
// const aws = require('aws-sdk');

cloudinary.config({
	cloud_name: process.env.cloudinary_cloud_name,
	api_key: process.env.cloudinary_api_key,
	api_secret: process.env.cloudinary_api_secret
});

// aws.config.update({
//     accessKeyId: process.env.aws_access_key_id,
//     secretAccessKey: process.env.aws_secret_access_key
// });

// Set S3 endpoint to DigitalOcean Spaces
// const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
// const s3 = new aws.S3({
//   endpoint: spacesEndpoint
// });

export const downloadImage = async item => {
    let url = '';
    if ( item.thumbnail ) url = item.thumbnail;
    if ( item.avatar ) url = item.avatar;

	console.log(`saving image ${url}`);
	return new Promise(function(resolve, reject) {
		cloudinary.uploader.upload(
			url,
			{
				folder: 'yt',
				colors: true
			},
			(error, result) => {
				if (error) console.log(error);

				if (result) {
					item.color_primary = result.colors[0][0];
					item.color_list = result.colors
						.slice(1, 6)
						.map(curr => {
							return curr[0].replace(',', '');
						})
                        .join();
                        
                    if ( item.thumbnail ) {
                        item.thumbnail_url = result.url;

						// TODO : replace with mysql save
                        // Video.findOneAndUpdate(
                        //     { url_simple: item.url_simple },
                        //     item,
                        //     function(err, result) {
                        //         console.log(
                        //             `saved video updates to DB, with color ${item.color_primary}`
                        //         );
                        //         resolve(result);
                        //     }
                        // );
                    } else if ( item.avatar ) {
                        item.avatar_url = result.url;

						// TODO: replace with mysql save
                        // Channel.findOneAndUpdate(
                        //     { _id : item._id },
                        //     item,
                        //     function(err, result) {
                        //         console.log(
                        //             `saved channel updates to DB, with color ${item.color_primary}`
                        //         );
                        //         resolve(result);
                        //     }
                        // );
                    }

				} else {
					console.error('result was no good, nothing to save :(');
				}
			}
		);

		// works, but need a good file name and images arent rendering yet
		// axios(url)
		// .then(res => {
		//     return s3.putObject({
		//         Bucket: process.env.aws_bucket_name,
		//         Key: url,
		//         Body: res.body,
		//         ACL: 'public-read',
		//         ContentType: 'image/jpg'
		//     }).promise();
		// }).then(res => {
		//     resolve(res);
		// }).catch(err => {
		//     reject(err);
		// });

		// latest try, as of Sunday 3/29/20
		// uploading works, no errors, but the image wont render properly
		// axios(url).then(res => {
		//     return s3.upload({
		//         Bucket: process.env.aws_bucket_name,
		//         Key: `${video_id}.jpg`,
		//         Body:  Buffer.from(res.data, 'base64'),
		//         ACL: 'public-read',
		//         ContentType: 'image/jpg'
		//     }).promise();
		// }).then(res => {
		//     resolve(res);
		// }).catch(err => {
		//     reject(err);
		// });
	});
};
export default downloadImage;
