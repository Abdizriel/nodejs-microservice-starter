import ServiceController from './service.controller';

export default class ServiceRoutes {
  static init(router) {
    router.route('/services')
      .get(ServiceController.list)
      .post(ServiceController.create);
``
    router.route('/services/:id')
      .get(ServiceController.show)
      .put(ServiceController.update)
      .delete(ServiceController.delete);
  }
}
