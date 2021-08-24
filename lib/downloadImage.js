const fs = require('fs');
const fetch = require('node-fetch');

async function downloadImage(url, location, file_name) {
    const response = await fetch(url);
    const buffer = await response.buffer();
    const dir = `./public/data/${location}`;
    const image = `${dir}/${file_name}.jpg`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFile(image, buffer, () => {
        return image;
    });
    return image;
}
module.exports = downloadImage;
