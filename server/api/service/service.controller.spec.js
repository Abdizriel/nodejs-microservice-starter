'use strict';

import app from '../../index';
import request from 'supertest';
import { expect } from 'chai';

let newService = undefined;

describe('Service API:', () => {

  describe('GET /api/services', () => {
    let services;

    beforeEach(done => {
      request(app)
        .get('/api/services')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
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
          serviceData: 'Some data'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newService = res.body;
          done();
        });
    });

    it('should respond with the newly created service', () => {
      expect(newService.serviceData).to.equal('Some data');
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
          if (err) {
            return done(err);
          }
          service = res.body;
          done();
        });
    });

    afterEach(() => {
      service = {};
    });

    it('should respond with the requested service', () => {
      expect(service.serviceData).to.equal('Some data');
    });

  });

  describe('DELETE /api/services/:id', () => {

    it('should respond with 204 on successful removal', done => {
      request(app)
        .delete('/api/services/' + newService._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
