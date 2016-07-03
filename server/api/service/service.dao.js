import mongoose from 'mongoose';
import Promise from 'bluebird';
import serviceSchema from './service.model';
import _ from 'lodash';

serviceSchema.statics.list = () => {
  return new Promise((resolve, reject) => {
    const _query = {};

    Service.find(_query)
      .exec((err, services) => {
        err ? reject(err) : resolve(services);
      });
  });
};

serviceSchema.statics.show = id => {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject(new TypeError('Id is not defined.'));
    }

    Service.findById(id)
      .exec((err, service) => {
        err ? reject(err) : resolve(service);
      });
  });
};

serviceSchema.statics.create = service => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(service)) {
      return reject(new TypeError('Service is not a valid object.'));
    }

    const _service = new Service(service);

    _service.save((err, saved) => {
      err ? reject(err) : resolve(saved);
    });
  });
};

serviceSchema.statics.update = (id, service) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    if (!_.isObject(service)) {
      return reject(new TypeError('Service is not a valid object.'));
    }

    Service.findByIdAndUpdate(id, service)
      .exec((err, updated) => {
        err ? reject(err) : resolve(updated);
      });
  });
};

serviceSchema.statics.delete = id => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    Service.findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err) : resolve(deleted);
      });
  });
};

const Service = mongoose.model('Service', serviceSchema);

export default Service;
