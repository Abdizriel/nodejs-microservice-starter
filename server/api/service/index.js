/**
 * @description Service route Controller
 * @param ServiceController
 */
import ServiceController from './service.controller';

/**
 * @class ServiceRoutes
 * @classdesc Class that represents Service routes
 * @exports ServiceRoutes
 * @default
 */
export default class ServiceRoutes {

  /**
   * @function init
   * @description Init Service routes for Express router
   * @param {Router} router - Express Framework Router
   * @static
   */
  static init(router) {

    // /api/services routes configs
    router.route('/services')
      .get(ServiceController.list)
      .post(ServiceController.create);

    // /api/services/:id routes configs
    router.route('/services/:id')
      .get(ServiceController.show)
      .put(ServiceController.update)
      .delete(ServiceController.delete);
  }
}
