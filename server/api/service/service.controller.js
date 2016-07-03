import ServiceDAO from './service.dao';

export default class ServiceController {
  static list(req, res) {
    ServiceDAO.list()
      .then(services => res.status(200).json(services))
      .catch(error => res.status(400).json(error));
  }

  static show(req, res) {
    ServiceDAO.show(req.params.id)
        .then(service => res.status(200).json(service))
        .catch(error => res.status(400).json(error));
  }

  static create(req, res) {
    const _service = req.body;

    ServiceDAO.create(_service)
      .then(service => res.status(201).json(service))
      .catch(error => res.status(400).json(error));
  }

  static update(req, res) {
    const _id = req.params.id;
    const _service = req.body;

    ServiceDAO.update(_id, _service)
      .then(service => res.status(200).json(service))
      .catch(error => res.status(400).json(error));
  }

  static delete(req, res) {
    const _id = req.params.id;

    ServiceDAO.delete(_id)
      .then(() => res.status(204).end())
      .catch(error => res.status(400).json(error));
  }
}
