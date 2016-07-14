import Service from '../api/service/service.dao';
import Promise from 'bluebird';

exports.setupMongoose = mongoose => {
  mongoose.models = {};
  mongoose.connect(process.env.MONGODB_URI);
  mongoose.connection.on('error', () => {});
};

exports.closeMongoose = mongoose => {
  mongoose.connection.close();
};

exports.createServices = () => {
  return new Promise(resolve => {
    for (let i = 0; i < 10; i++) {
      Service.create({ serviceData: 'aaaaaaa'+i});
    }
    resolve()
  });
};
