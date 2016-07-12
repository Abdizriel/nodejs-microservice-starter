'use strict';

import path from 'path';

const isProcessEnvSet = (name, required = true) => {
  if (!process.env[name] && required) throw new Error(`You must set the ${name} environment variable`);
  if (!process.env[name] && !required) console.warn(`Optional environment variable ${name} is not set. Default would be used.`);

};

const requiredProcessEnv = ['NODE_ENV', 'MONGODB_URI'];
const optionalProcessEnv = ['PORT', 'IP'];

requiredProcessEnv.forEach(process => isProcessEnvSet(process));
optionalProcessEnv.forEach(process => isProcessEnvSet(process, false));

// Configuration
// ============================================
const config = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI,
    options: {
      db: {
        safe: true
      }
    }
  }
};

// Export the config object
// ==============================================
export default config;
