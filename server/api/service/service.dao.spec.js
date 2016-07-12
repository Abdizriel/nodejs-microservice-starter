import mongoose from 'mongoose';
import { expect } from 'chai';

import ServiceDAO from './service.dao';
import { setupMongoose, closeMongoose, createServices} from '../../config/db.conf.test';


describe('Service Data Access Object: ', () => {
  before(() => {
    setupMongoose(mongoose);
  });

  after(() => {
    closeMongoose(mongoose);
  });

  afterEach(done => {
    ServiceDAO.remove({}, () => done());
  });

  describe('list', () => {
    beforeEach(done => {
      createServices()
        .then(() => done())
        .catch(() => done());
    });

    it('should get all services', done => {
      let _onSuccess = services => {
        expect(services).to.be.defined;
        expect(services[0]).to.have.property('serviceData').and.to.equal('aaaaaaa0');
        expect(services[0]).to.have.property('createdAt').and.to.be.defined;

        done();
      };
      let _onError = err => {
        expect(true).to.be.false; // should not come here
      };

      ServiceDAO.list()
        .then(_onSuccess)
        .catch(_onError);
    });
  });

  describe('create', () => {
    it('should throw an error, object passed is not defined', done => {
      let _undefinedService = undefined;
      let _onSuccess = () => {
        expect(true).to.be.false; // should not come here;
      };
      let _onError = error => {
        expect(error).to.be.defined;
        done();
      };

      ServiceDAO.create(_undefinedService)
        .then(_onSuccess)
        .catch(_onError);
    });

    it('should create the service correctly', done => {
      let _service = {serviceData: 'abc'};
      let _onSuccess = service => {
        expect(service).to.be.defined;
        expect(service.serviceData).to.equal('abc');
        expect(service.createdAt).to.be.defined;

        done();
      };
      let _onError = () => {
        expect(true).to.be.false;
      };

      ServiceDAO.create(_service)
        .then(_onSuccess)
        .catch(_onError);
    });
  });

  describe('delete', () => {
    beforeEach(done => {
      createServices()
        .then(() => done())
        .catch(() => done());
    });

    it('should get an error back, id is not defined', done => {
      let _id = null;
      let _onSuccess = () => {
        expect(true).to.be.false;
      };
      let _onError = error => {
        expect(error).to.be.defined;
        done();
      };

      ServiceDAO.delete(_id)
        .then(_onSuccess)
        .catch(_onError);
    });

    it('should delete the doc successfully', done => {
      let _id = '507c7f79bcf86cd7994f6c10';
      let _onSuccess = () => {
        expect(true).to.be.true;
        done();
      };
      let _onError = () => {
        expect(true).to.be.false;
      };

      ServiceDAO.delete(_id)
        .then(_onSuccess)
        .catch(_onError);
    })
  })
});
