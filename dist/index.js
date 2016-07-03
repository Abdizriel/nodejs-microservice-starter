'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _env = require('./config/env');

var _env2 = _interopRequireDefault(_env);

var _dbConf = require('./config/db.conf.js');

var _dbConf2 = _interopRequireDefault(_dbConf);

var _routesConf = require('./config/routes.conf.js');

var _routesConf2 = _interopRequireDefault(_routesConf);

var _appConf = require('./config/app.conf.js');

var _appConf2 = _interopRequireDefault(_appConf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Create application with Express Framework
 * @param app
 */


/**
 * @description Routes config class
 * @param Routes
 */


/**
 * @description Configuration object
 * @param config
 */
/**
 * @description HTTP server module
 * @param http
 */
var app = (0, _express2.default)();

/**
 * @description Create application server
 * @param server
 */


/**
 * @description IApplication config class
 * @param Routes
 */


/**
 * @description Database config class
 * @param DBConfig
 */


/**
 * @description Express Framework module
 * @param express
 */
var server = _http2.default.createServer(app);

/**
 * @description Configure Database
 */
_dbConf2.default.init();

/**
 * @description Configure Application
 */
_appConf2.default.init(app);

/**
 * @description Configure Routes
 */
_routesConf2.default.init(app, _express2.default.Router());

/**
 * @function startServer
 * @description Start API Server
 */
var startServer = function startServer() {
  server.listen(_env2.default.port, _env2.default.ip, function () {
    console.log('Express server listening on %s:%s in %s mode', _env2.default.ip, _env2.default.port, _env2.default.env);
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