// ███████╗ █████╗ ██╗   ██╗███████╗     ██████╗██╗  ██╗ █████╗ ███╗   ██╗███╗   ██╗███████╗██╗         ████████╗ ██████╗     ██████╗ ██████╗ 
// ██╔════╝██╔══██╗██║   ██║██╔════╝    ██╔════╝██║  ██║██╔══██╗████╗  ██║████╗  ██║██╔════╝██║         ╚══██╔══╝██╔═══██╗    ██╔══██╗██╔══██╗
// ███████╗███████║██║   ██║█████╗      ██║     ███████║███████║██╔██╗ ██║██╔██╗ ██║█████╗  ██║            ██║   ██║   ██║    ██║  ██║██████╔╝
// ╚════██║██╔══██║╚██╗ ██╔╝██╔══╝      ██║     ██╔══██║██╔══██║██║╚██╗██║██║╚██╗██║██╔══╝  ██║            ██║   ██║   ██║    ██║  ██║██╔══██╗
// ███████║██║  ██║ ╚████╔╝ ███████╗    ╚██████╗██║  ██║██║  ██║██║ ╚████║██║ ╚████║███████╗███████╗       ██║   ╚██████╔╝    ██████╔╝██████╔╝
// ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝╚══════╝       ╚═╝    ╚═════╝     ╚═════╝ ╚═════╝ 

// const Channel = require('../models/channel');
const shortid = require('shortid');
const ytpl = require('ytpl');
import { format } from 'date-fns';
import downloadImage from './downloadImage';

const saveChannelToDb = async (req) => {
	return new Promise(function(resolve, reject) {
        ytpl(req.body.url, function(err, playlist) {
            if (err) throw err;
    
            // update channel data
            req.body.name = playlist.author.name;
            req.body.avatar = playlist.author.avatar;
            req.body.channel_url = playlist.author.channel_url;
            req.body.yt_user_url = playlist.author.user_url;
            req.body.yt_user = playlist.author.user;
            req.body._id = shortid.generate();
            req.body.created_on = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            req.body.updated_on = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

            console.log(req.body);

            // TODO: replace with mysql save
            // new Channel(req.body).save((err, channel) => {
            //     if (err) return console.log(err);
    
            //     console.log(
            //         `saved the channel ${channel.name} to DB, now downloading thumbnail and generating colors`
            //     );
            //     console.log(`channel avatar url: ${channel.avatar}`);
            //     downloadImage(channel).then(downloadResult => {
            //         resolve(downloadResult);
            //     });
            // });
        });
    });
};

export default saveChannelToDb;
