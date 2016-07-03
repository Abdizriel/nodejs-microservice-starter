/**
 * @description Service Data Access Object
 * @param ServiceDAO
 */
import ServiceDAO from './service.dao';

/**
 * @class ServiceController
 * @classdesc Class that represents Service Controller
 * @exports ServiceController
 * @default
 */
export default class ServiceController {

  /**
   * @function list
   * @description Function that returns all services from Service Data Access Object
   * @param {Request} req - Express Framework Request Object
   * @param {Response} res - Express Framework Response Object
   * @static
   */
  static list(req, res) {
    ServiceDAO.list()
      .then(services => res.status(200).json(services))
      .catch(error => res.status(400).json(error));
  }

  /**
   * @function show
   * @description Function that returns single service from Service Data Access Object
   * by id provided in url
   * @param {Request} req - Express Framework Request Object
   * @param {Response} res - Express Framework Response Object
   * @static
   */
  static show(req, res) {
    ServiceDAO.show(req.params.id)
        .then(service => res.status(200).json(service))
        .catch(error => res.status(400).json(error));
  }

  /**
   * @function create
   * @description Function that create service through Service Data Access Object
   * by provided request body
   * @param {Request} req - Express Framework Request Object
   * @param {Response} res - Express Framework Response Object
   * @static
   */
  static create(req, res) {
    const _service = req.body;

    ServiceDAO.create(_service)
      .then(service => res.status(201).json(service))
      .catch(error => res.status(400).json(error));
  }

  /**
   * @function update
   * @description Function that update service through Service Data Access Object
   * by provided id in url and updated data in request body
   * @param {Request} req - Express Framework Request Object
   * @param {Response} res - Express Framework Response Object
   * @static
   */
  static update(req, res) {
    const _id = req.params.id;
    const _service = req.body;

    ServiceDAO.update(_id, _service)
      .then(service => res.status(200).json(service))
      .catch(error => res.status(400).json(error));
  }

  /**
   * @function delete
   * @description Function that delete service through Service Data Access Object
   * by id provided in url
   * @param {Request} req - Express Framework Request Object
   * @param {Response} res - Express Framework Response Object
   * @static
   */
  static delete(req, res) {
    const _id = req.params.id;

    ServiceDAO.delete(_id)
      .then(() => res.status(204).end())
      .catch(error => res.status(400).json(error));
  }

}
