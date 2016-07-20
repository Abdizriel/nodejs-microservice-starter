import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;

export default class DBConfig {
  static init() {
    mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on('error', err => {
      console.error(`MongoDB connection error: ${err}`);
      process.exit(-1);
    });
  }
}
