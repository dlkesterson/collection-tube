const ws = require('ws');
// import ws from 'ws';
const wsServer = new ws.Server({ noServer: true });

// wsServer.on('connection', socket => {
// 	console.log('...connected from lib file...');
// });

module.exports = wsServer;
// export default wsServer;
