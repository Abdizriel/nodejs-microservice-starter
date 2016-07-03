/**
 * @description MongoDB driver module
 * @param mongoose
 */
import mongoose from 'mongoose';

/**
 * @description Promises/A+ module
 * @param Promise
 */
import Promise from 'bluebird';

/**
 * @description Service Data Schema
 * @param serviceSchema
 */
import serviceSchema from './service.model';

/**
 * @description JavaScript utility module
 * @param _
 */
import _ from 'lodash';

/**
 * @function list
 * @description Function that returns all services from MongoDB
 * @static
 * @returns {Promise} Result of documents search
 */
serviceSchema.statics.list = () => {
  return new Promise((resolve, reject) => {
    const _query = {};

    Service.find(_query)
      .exec((err, services) => {
        err ? reject(err) : resolve(services);
      });
  });
};

/**
 * @function show
 * @description Function that returns single service from MongoDB by provided id
 * @param {String} id - Service document id search
 * @static
 * @returns {Promise} Result of document search
 */
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

/**
 * @function create
 * @description Function that create new service in MongoDB from provided object
 * @param {Object} service - New service
 * @static
 * @returns {Promise} Result of document creation
 */
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

/**
 * @function update
 * @description Function that update service in MongoDB by provided service id and updated object
 * @param {String} id - Service id
 * @param {Object} service - Updated service
 * @static
 * @returns {Promise} Result of document creation
 */
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

/**
 * @function delete
 * @description Function that delete service from MongoDB by provided id
 * @param {String} id - Service document id to remove
 * @static
 * @returns {Promise} Result of document deletion
 */
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

/**
 * @description Service Model
 * @param Service
 * @const
 */
const Service = mongoose.model('Service', serviceSchema);

/**
 * @exports Service
 * @default
 */
export default Service;
