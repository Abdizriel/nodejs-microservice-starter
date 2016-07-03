'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _service2 = require('./service.model');

var _service3 = _interopRequireDefault(_service2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_service3.default.statics.list = function () {
  return new _bluebird2.default(function (resolve, reject) {
    var _query = {};

    Service.find(_query).exec(function (err, services) {
      err ? reject(err) : resolve(services);
    });
  });
};

_service3.default.statics.show = function (id) {
  return new _bluebird2.default(function (resolve, reject) {
    if (!id) {
      return reject(new TypeError('Id is not defined.'));
    }

    Service.findById(id).exec(function (err, service) {
      err ? reject(err) : resolve(service);
    });
  });
};

_service3.default.statics.create = function (service) {
  return new _bluebird2.default(function (resolve, reject) {
    if (!_lodash2.default.isObject(service)) {
      return reject(new TypeError('Service is not a valid object.'));
    }

    var _service = new Service(service);

    _service.save(function (err, saved) {
      err ? reject(err) : resolve(saved);
    });
  });
};

_service3.default.statics.update = function (id, service) {
  return new _bluebird2.default(function (resolve, reject) {
    if (!_lodash2.default.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    if (!_lodash2.default.isObject(service)) {
      return reject(new TypeError('Service is not a valid object.'));
    }

    Service.findByIdAndUpdate(id, service).exec(function (err, updated) {
      err ? reject(err) : resolve(updated);
    });
  });
};

_service3.default.statics.delete = function (id) {
  return new _bluebird2.default(function (resolve, reject) {
    if (!_lodash2.default.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    Service.findByIdAndRemove(id).exec(function (err, deleted) {
      err ? reject(err) : resolve(deleted);
    });
  });
};

var Service = _mongoose2.default.model('Service', _service3.default);

exports.default = Service;