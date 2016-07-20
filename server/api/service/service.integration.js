'use strict';

import request from 'supertest';
import { expect } from 'chai';
import Service from './service.model';

let app = require('../..');
let newService;

describe('Service API:', () => {

  before(done => {
    Service.remove({})
      .then(() => done())
  });

  describe('GET /api/services', () => {
    let services;

    beforeEach(done => {
      request(app)
        .get('/api/services')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          services = res.body;
          done();
        });
    });

    it('should respond with JSON array', () => {
      expect(services).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/services', () => {
    beforeEach(done => {
      request(app)
        .post('/api/services')
        .send({
          name: 'Service Test'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          newService = res.body;
          done();
        });
    });

    it('should respond with the newly created service', () => {
      expect(newService).to.be.instanceOf(Object);
      expect(newService).ownProperty('_id');
      expect(newService._id).to.not.be.undefined;
      expect(newService._id).to.not.be.null;
      expect(newService).ownProperty('name');
      expect(newService.name).to.equal('Service Test');
      expect(newService).ownProperty('createdAt');
      expect(newService.createdAt).to.not.be.undefined;
      expect(newService.createdAt).to.not.be.null;
    });

  });

  describe('GET /api/services/:id', () => {
    let service;

    beforeEach(done => {
      request(app)
        .get('/api/services/' + newService._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          service = res.body;
          done();
        });
    });

    afterEach(() => {
      service = {};
    });

    it('should respond with the requested service', () => {
      expect(service).to.be.instanceOf(Object);
      expect(service).ownProperty('_id');
      expect(service._id).to.not.be.undefined;
      expect(service._id).to.not.be.null;
      expect(service).ownProperty('name');
      expect(service.name).to.equal('Service Test');
      expect(service).ownProperty('createdAt');
      expect(service.createdAt).to.not.be.undefined;
      expect(service.createdAt).to.not.be.null;
    });

  });

  describe('PUT /api/services/:id', () => {
    let updatedService;

    beforeEach(done => {
      request(app)
        .put('/api/services/' + newService._id)
        .send({

          _id: newService._id,
          name: 'Updated Service'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          updatedService = res.body;
          done();
        });
    });

    afterEach(() => {
      updatedService = {};
    });

    it('should respond with the updated service', () => {
      expect(updatedService).to.be.instanceOf(Object);
      expect(updatedService).ownProperty('_id');
      expect(updatedService._id).to.not.be.undefined;
      expect(updatedService._id).to.not.be.null;
      expect(updatedService).ownProperty('name');
      expect(updatedService.name).to.equal('Updated Service');
      expect(updatedService).ownProperty('createdAt');
      expect(updatedService.createdAt).to.not.be.undefined;
      expect(updatedService.createdAt).to.not.be.null;
      // expect(updatedService).ownProperty('updatedAt');
      // expect(updatedService.updatedAt).to.not.be.undefined;
      // expect(updatedService.updatedAt).to.not.be.null;
    });

  });

  describe('PATCH /api/services/:id', () => {
    let patchedService;

    beforeEach(done => {
      request(app)
        .put('/api/services/' + newService._id)
        .send({
          _id: newService._id,
          name: 'Patched Service'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          patchedService = res.body;
          done();
        });
    });

    afterEach(() => {
      patchedService = {};
    });

    it('should respond with the updated service', () => {
      expect(patchedService).to.be.instanceOf(Object);
      expect(patchedService).ownProperty('_id');
      expect(patchedService._id).to.not.be.undefined;
      expect(patchedService._id).to.not.be.null;
      expect(patchedService).ownProperty('name');
      expect(patchedService.name).to.equal('Patched Service');
      expect(patchedService).ownProperty('createdAt');
      expect(patchedService.createdAt).to.not.be.undefined;
      expect(patchedService.createdAt).to.not.be.null;
      // expect(patchedService).ownProperty('updatedAt');
      // expect(patchedService.updatedAt).to.not.be.undefined;
      // expect(patchedService.updatedAt).to.not.be.null;
    });

  });

  describe('DELETE /api/services/:id', () => {

    it('should respond with 204 on successful removal', done => {
      request(app)
        .delete('/api/services/' + newService._id)
        .expect(204)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('should respond with 404 when service does not exist', done => {
      request(app)
        .delete('/api/services/' + newService._id)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

  });

});
