const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../config/appconfig');
const Logger = require('../utils/logger');
const swagger = require('../utils/swagger');
const dbContext = require('../models/index');
const mainRouter = require('../router/index');

// Init express app
const app = express();

// Init logger
const logger = new Logger();

// Custom config
app.set('config', config);
app.set('port', config.app.port);
app.set('db', dbContext);

// Mount middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

app.use('/api/docs', swagger.router);
app.use('/', mainRouter);

process.on('SIGINT', () => {
  logger.log('stopping server', 'info');
  process.exit();
})

module.exports = app;
