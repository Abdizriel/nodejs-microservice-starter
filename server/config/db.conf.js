import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from './index';

mongoose.Promise = bluebird;

export default class DBConfig {
  static init() {
    mongoose.connect(config.mongo.uri);
    mongoose.connection.on('error', console.error.bind(console, 'An error occurred with the DB connection: '));
  }
};
