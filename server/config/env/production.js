'use strict';

// Production specific configuration
// =================================
module.exports = {

  // Server IP
  ip: process.env.IP ||
      undefined,

  // Server port
  port: process.env.PORT ||
        9000,

  // MongoDB connection options
  mongo: {
    uri:  process.env.MONGODB_URI ||
          'mongodb://mongo:27017/aggregation-insert'
  }

};
