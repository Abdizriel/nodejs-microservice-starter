/**
 * @description MongoDB Schema
 * @param Schema
 */
import { Schema } from 'mongoose';

/**
 * @description Service MongoDB Schema
 * @param serviceSchema
 * @private
 * @const
 */
const _serviceSchema = {
  serviceData: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
};

/**
 * @exports serviceSchema
 * @default
 */
export default Schema(_serviceSchema);
