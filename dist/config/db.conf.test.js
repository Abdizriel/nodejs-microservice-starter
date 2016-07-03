'use strict';

var _service = require('../api/service/service.dao');

var _service2 = _interopRequireDefault(_service);

var _index = require('./env/index');

var _index2 = _interopRequireDefault(_index);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.setupMongoose = function (mongoose) {
  mongoose.models = {};
  mongoose.connect(_index2.default.mongo.uri);
  mongoose.connection.on('error', function () {});
};

exports.closeMongoose = function (mongoose) {
  mongoose.connection.close();
};

exports.createServices = function () {
  return new _bluebird2.default(function (resolve) {
    for (var i = 0; i < 10; i++) {
      _service2.default.create({ serviceData: 'aaaaaaa' + i });
    }
    resolve();
  });
};