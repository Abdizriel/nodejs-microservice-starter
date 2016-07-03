'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chai = require('chai');

var _service2 = require('./service.dao');

var _service3 = _interopRequireDefault(_service2);

var _dbConfTest = require('../../config/db.conf.test.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Service Data Access Object: ', function () {
  before(function () {
    (0, _dbConfTest.setupMongoose)(_mongoose2.default);
  });

  after(function () {
    (0, _dbConfTest.closeMongoose)(_mongoose2.default);
  });

  afterEach(function (done) {
    _service3.default.remove({}, function () {
      return done();
    });
  });

  describe('list', function () {
    beforeEach(function (done) {
      (0, _dbConfTest.createServices)().then(function () {
        return done();
      }).catch(function () {
        return done();
      });
    });

    it('should get all services', function (done) {
      var _onSuccess = function _onSuccess(services) {
        (0, _chai.expect)(services).to.be.defined;
        (0, _chai.expect)(services[0]).to.have.property('serviceData').and.to.equal('aaaaaaa0');
        (0, _chai.expect)(services[0]).to.have.property('createdAt').and.to.be.defined;

        done();
      };
      var _onError = function _onError(err) {
        (0, _chai.expect)(true).to.be.false; // should not come here
      };

      _service3.default.list().then(_onSuccess).catch(_onError);
    });
  });

  describe('create', function () {
    it('should throw an error, object passed is not defined', function (done) {
      var _undefinedService = undefined;
      var _onSuccess = function _onSuccess() {
        (0, _chai.expect)(true).to.be.false; // should not come here;
      };
      var _onError = function _onError(error) {
        (0, _chai.expect)(error).to.be.defined;
        done();
      };

      _service3.default.create(_undefinedService).then(_onSuccess).catch(_onError);
    });

    it('should create the service correctly', function (done) {
      var _service = { serviceData: 'abc' };
      var _onSuccess = function _onSuccess(service) {
        (0, _chai.expect)(service).to.be.defined;
        (0, _chai.expect)(service.serviceData).to.equal('abc');
        (0, _chai.expect)(service.createdAt).to.be.defined;

        done();
      };
      var _onError = function _onError() {
        (0, _chai.expect)(true).to.be.false;
      };

      _service3.default.create(_service).then(_onSuccess).catch(_onError);
    });
  });

  describe('delete', function () {
    beforeEach(function (done) {
      (0, _dbConfTest.createServices)().then(function () {
        return done();
      }).catch(function () {
        return done();
      });
    });

    it('should get an error back, id is not defined', function (done) {
      var _id = null;
      var _onSuccess = function _onSuccess() {
        (0, _chai.expect)(true).to.be.false;
      };
      var _onError = function _onError(error) {
        (0, _chai.expect)(error).to.be.defined;
        done();
      };

      _service3.default.delete(_id).then(_onSuccess).catch(_onError);
    });

    it('should delete the doc successfully', function (done) {
      var _id = '507c7f79bcf86cd7994f6c10';
      var _onSuccess = function _onSuccess() {
        (0, _chai.expect)(true).to.be.true;
        done();
      };
      var _onError = function _onError() {
        (0, _chai.expect)(true).to.be.false;
      };

      _service3.default.delete(_id).then(_onSuccess).catch(_onError);
    });
  });
});