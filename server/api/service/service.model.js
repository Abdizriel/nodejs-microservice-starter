import { Schema } from 'mongoose';

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

export default Schema(_serviceSchema);
