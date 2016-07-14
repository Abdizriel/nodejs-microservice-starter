import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;

export default class DBConfig {
  static init() {
    mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on('error', console.error.bind(console, 'An error occurred with the DB connection: '));
  }
};
