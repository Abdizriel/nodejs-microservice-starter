'use strict';

// Production specific configuration
// =================================

module.exports = {

  // Server IP
  ip: process.env.IP || 'localhost',

  // Server port
  port: process.env.PORT || 9000,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://mongo:27017/aggregation-insert'
  }

};