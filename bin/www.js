const http = require('http');
const app = require('../server/index');
const config = require('../config/appconfig').app;

app.get('/', (req, res) => {
  res.status(200).send('HI');
})

// Create http server
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`Server is running on 'localhost:${process.env.PORT}'`);
});
