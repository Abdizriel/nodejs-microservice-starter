'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

const serviceCtrlStub = {
  index: 'serviceCtrl.index',
  show: 'serviceCtrl.show',
  create: 'serviceCtrl.create',
  update: 'serviceCtrl.update',
  destroy: 'serviceCtrl.destroy'
};

const routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
const serviceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './service.controller': serviceCtrlStub
});

describe('Service API Router:', function() {

  describe('GET /api/services', function() {

    it('should route to service.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'serviceCtrl.index')
      ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/services/:id', function() {

    it('should route to service.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'serviceCtrl.show')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/services', function() {

    it('should route to service.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'serviceCtrl.create')
      ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/services/:id', function() {

    it('should route to service.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'serviceCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/services/:id', function() {

    it('should route to service.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'serviceCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/services/:id', function() {

    it('should route to service.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'serviceCtrl.destroy')
      ).to.have.been.calledOnce;
    });

  });

});
