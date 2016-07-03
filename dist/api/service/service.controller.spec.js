'use strict';

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newService = undefined;

describe('Service API:', function () {

  describe('GET /api/services', function () {
    var services = void 0;

    beforeEach(function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/services').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        services = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      (0, _chai.expect)(services).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/services', function () {

    beforeEach(function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/services').send({
        serviceData: 'Some data'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newService = res.body;
        done();
      });
    });

    it('should respond with the newly created service', function () {
      (0, _chai.expect)(newService.serviceData).to.equal('Some data');
    });
  });

  describe('GET /api/services/:id', function () {
    var service = void 0;

    beforeEach(function (done) {
      (0, _supertest2.default)(_index2.default).get('/api/services/' + newService._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        service = res.body;
        done();
      });
    });

    afterEach(function () {
      service = {};
    });

    it('should respond with the requested service', function () {
      (0, _chai.expect)(service.serviceData).to.equal('Some data');
    });
  });

  describe('DELETE /api/services/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(_index2.default).delete('/api/services/' + newService._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});