'use strict';

import { noPreserveCache } from 'proxyquire';
import sinon from 'sinon';
import { expect } from 'chai';

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

const serviceIndex = noPreserveCache('./index', {
  'express': {
    Router() {
      return routerStub;
    }
  },
  './service.controller': serviceCtrlStub
});

describe('Service API Router:', () => {

  // it('should return an express router instance', function() {
  //   expect(serviceIndex).to.equal(routerStub);
  // });

  describe('GET /api/services', () => {

    it('should verify route to service.controller.index', () => {
      expect(routerStub.get
        .withArgs('/', 'serviceCtrl.index')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/services', () => {

    it('should route to service.controller.create', () => {
    expect(routerStub.post
      .withArgs('/', 'serviceCtrl.create')
    ).to.have.been.calledOnce;
  });

  });

  describe('DELETE /api/services/:id', () => {

    it('should verify route to service.controller.destroy', () => {
      expect(routerStub.delete
        .withArgs('/:id', 'serviceCtrl.destroy')
      ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/services/:id', () => {

    it('should verify route to service.controller.update', () => {
      expect(routerStub.put
        .withArgs('/:id', 'serviceCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/services/:id', () => {

    it('should verify route to service.controller.update', () => {
      expect(routerStub.patch
        .withArgs('/:id', 'serviceCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/services/:id', () => {

    it('should verify route to service.controller.show', () => {
      expect(routerStub.get
        .withArgs('/:id', 'serviceCtrl.show')
      ).to.have.been.calledOnce;
    });

  });

});
