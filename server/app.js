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
 * @description Configure env variables
 * @param config
 */
import dotenv from 'dotenv-safe'
dotenv.load({
  path: `${__dirname}/config/.env`,
  sample: `${__dirname}/.env.example`,
  allowEmptyValues: false
});

/**
 * @description Database config class
 * @param DBConfig
 */
import DBConfig from './config/db.conf';

/**
 * @description Routes config class
 * @param Routes
 */
import { initRoutes } from './config/routes.conf';

/**
 * @description IApplication config class
 * @param Routes
 */
import ApplicationConfig from './config/app.conf';

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
initRoutes(app);

/**
 * @function startServer
 * @description Start API Server
 */
const startServer = () => {
  server.listen(process.env.PORT, process.env.IP, () => {
    console.log('Express server listening on %s:%s in %s mode', process.env.IP, process.env.PORT, process.env.NODE_ENV);
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
