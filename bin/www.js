const http = require('http');
const app = require('../server/index');
const config = require('../config/appconfig').app;

// Create http server
const server = http.createServer(app);
server.listen(config.port, 'localhost', () => {
  console.log(`Server is running on 'localhost:${config.port}'`);
});
