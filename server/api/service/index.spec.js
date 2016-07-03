'use strict';

import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { expect } from 'chai';

const indexCtrlStub = {
  list: 'indexCtrl.list',
  show: 'indexCtrl.show',
  create: 'indexCtrl.create',
  update: 'indexCtrl.update',
  delete: 'indexCtrl.delete'
};

const routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

const serviceIndex = proxyquire('./index', {
  'express': {
    Router() {
      return routerStub;
    }
  },
  './service.controller': indexCtrlStub
});

describe('Index API Router:', () => {

  describe('GET /api/services', () => {

    it('should verify route to service.controller.list', () => {
      expect(routerStub.get
        .withArgs('/', 'indexCtrl.list')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/services', () => {

    it('should route to service.controller.create', () => {
    expect(routerStub.post
      .withArgs('/', 'indexCtrl.create')
    ).to.have.been.calledOnce;
  });

  });

  describe('DELETE /api/services/:id', () => {

    it('should verify route to service.controller.delete', () => {
      expect(routerStub.delete
        .withArgs('/:id', 'indexCtrl.delete')
      ).to.have.been.calledOnce;
    });

    it('should verify route to service.controller.delete without argument', () => {
      expect(routerStub.delete
        .withArgs('/', 'indexCtrl.delete')
      ).to.have.been.not.calledOnce;
    });

  });

  describe('PUT /api/services/:id', () => {

    it('should verify route to service.controller.update', () => {
      expect(routerStub.put
        .withArgs('/:id', 'indexCtrl.update')
      ).to.have.been.calledOnce;
    });

    it('should verify route to service.controller.update without argument', () => {
      expect(routerStub.put
        .withArgs('/', 'indexCtrl.update')
      ).to.have.been.not.calledOnce;
    });

  });

  describe('GET /api/services/:id', () => {

    it('should verify route to service.controller.show', () => {
      expect(routerStub.get
        .withArgs('/:id', 'indexCtrl.show')
      ).to.have.been.calledOnce;
    });

    it('should verify route to service.controller.show without argument', () => {
      expect(routerStub.get
        .withArgs('/', 'indexCtrl.show')
      ).to.have.been.not.calledOnce;
    });

  });

});
