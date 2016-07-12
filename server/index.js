/**
 * @description HTTP server module
 * @param http
 */
import http from 'http';

/**
 * @description Express Framework module
 * @param express
 */
import express from 'express';

/**
 * @description Configuration object
 * @param config
 */
import config from './config';

/**
 * @description Database config class
 * @param DBConfig
 */
import DBConfig from './config/db.conf.js';

/**
 * @description Routes config class
 * @param Routes
 */
import Routes from './config/routes.conf.js';

/**
 * @description IApplication config class
 * @param Routes
 */
import ApplicationConfig from './config/app.conf.js';

/**
 * @description Create application with Express Framework
 * @param app
 */
const app = express();

/**
 * @description Create application server
 * @param server
 */
const server = http.createServer(app);

/**
 * @description Configure Database
 */
DBConfig.init();

/**
 * @description Configure Application
 */
ApplicationConfig.init(app);

/**
 * @description Configure Routes
 */
Routes.init(app, express.Router());

/**
 * @function startServer
 * @description Start API Server
 */
const startServer = () => {
  server.listen(config.port, config.ip, () => {
    console.log('Express server listening on %s:%s in %s mode', config.ip, config.port, config.env);
  });
};

/**
 * @description Starting API Server after everythin is set up
 */
setImmediate(startServer);

/**
 * @description Application object
 * @module app
 */
module.exports = app;
