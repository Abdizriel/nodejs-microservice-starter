'use strict';

var _proxyquire = require('proxyquire');

var _proxyquire2 = _interopRequireDefault(_proxyquire);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexCtrlStub = {
  list: 'indexCtrl.list',
  show: 'indexCtrl.show',
  create: 'indexCtrl.create',
  update: 'indexCtrl.update',
  delete: 'indexCtrl.delete'
};

var routerStub = {
  get: _sinon2.default.spy(),
  put: _sinon2.default.spy(),
  post: _sinon2.default.spy(),
  delete: _sinon2.default.spy()
};

var serviceIndex = (0, _proxyquire2.default)('./index', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './service.controller': indexCtrlStub
});

describe('Index API Router:', function () {

  describe('GET /api/services', function () {

    it('should verify route to service.controller.list', function () {
      (0, _chai.expect)(routerStub.get.withArgs('/', 'indexCtrl.list')).to.have.been.calledOnce;
    });
  });

  describe('POST /api/services', function () {

    it('should route to service.controller.create', function () {
      (0, _chai.expect)(routerStub.post.withArgs('/', 'indexCtrl.create')).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/services/:id', function () {

    it('should verify route to service.controller.delete', function () {
      (0, _chai.expect)(routerStub.delete.withArgs('/:id', 'indexCtrl.delete')).to.have.been.calledOnce;
    });

    it('should verify route to service.controller.delete without argument', function () {
      (0, _chai.expect)(routerStub.delete.withArgs('/', 'indexCtrl.delete')).to.have.been.not.calledOnce;
    });
  });

  describe('PUT /api/services/:id', function () {

    it('should verify route to service.controller.update', function () {
      (0, _chai.expect)(routerStub.put.withArgs('/:id', 'indexCtrl.update')).to.have.been.calledOnce;
    });

    it('should verify route to service.controller.update without argument', function () {
      (0, _chai.expect)(routerStub.put.withArgs('/', 'indexCtrl.update')).to.have.been.not.calledOnce;
    });
  });

  describe('GET /api/services/:id', function () {

    it('should verify route to service.controller.show', function () {
      (0, _chai.expect)(routerStub.get.withArgs('/:id', 'indexCtrl.show')).to.have.been.calledOnce;
    });

    it('should verify route to service.controller.show without argument', function () {
      (0, _chai.expect)(routerStub.get.withArgs('/', 'indexCtrl.show')).to.have.been.not.calledOnce;
    });
  });
});