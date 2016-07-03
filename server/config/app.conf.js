import morgan from 'morgan';
import bodyParser from 'body-parser';
import contentLength from 'express-content-length-validator';
import helmet from 'helmet';
import express from 'express';

export default class ApplicationConfig {
  static init(app) {
    let _root = process.cwd();
    let _nodeModules = '/node_modules/';

    app.use(express.static(_root + _nodeModules));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(contentLength.validateMax({max: 999}));
    app.use(helmet());
  }
}
