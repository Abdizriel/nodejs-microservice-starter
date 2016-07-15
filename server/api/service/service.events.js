'use strict';

/**
 * @description Events Emitter
 * @param EventEmitter
 */
import { EventEmitter } from 'events';

/**
 * @description Service MongoDB schema
 * @param Service
 */
import Service from './service.model';

/**
 * @description Service Events Emitter
 * @param ServiceEvents
 */
const ServiceEvents = new EventEmitter();

ServiceEvents.setMaxListeners(0);

/**
 * @description Events to listen on
 * @param events
 */
const events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

/**
 * @description Emit correct event on hooks
 */
for (const e in events) {
  const event = events[e];
  Service.schema.post(e, emitEvent(event));
}

/**
 * @description Emit correct event
 * @function emitEvent
 * @function emitEvent
 * @param event - Event to emit
 */
function emitEvent(event) {
  return (doc, options, done) => {
    ServiceEvents.emit(event + ':' + doc._id, doc);
    ServiceEvents.emit(event, doc);
    done(null);
  }
}

/**
 * @export ServiceEvents
 * @default
 */
export default ServiceEvents;
