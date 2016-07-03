'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service2 = require('./service.dao');

var _service3 = _interopRequireDefault(_service2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceController = function () {
  function ServiceController() {
    _classCallCheck(this, ServiceController);
  }

  _createClass(ServiceController, null, [{
    key: 'list',
    value: function list(req, res) {
      _service3.default.list().then(function (services) {
        return res.status(200).json(services);
      }).catch(function (error) {
        return res.status(400).json(error);
      });
    }
  }, {
    key: 'show',
    value: function show(req, res) {
      _service3.default.show(req.params.id).then(function (service) {
        return res.status(200).json(service);
      }).catch(function (error) {
        return res.status(400).json(error);
      });
    }
  }, {
    key: 'create',
    value: function create(req, res) {
      var _service = req.body;

      _service3.default.create(_service).then(function (service) {
        return res.status(201).json(service);
      }).catch(function (error) {
        return res.status(400).json(error);
      });
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var _id = req.params.id;
      var _service = req.body;

      _service3.default.update(_id, _service).then(function (service) {
        return res.status(200).json(service);
      }).catch(function (error) {
        return res.status(400).json(error);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {
      var _id = req.params.id;

      _service3.default.delete(_id).then(function () {
        return res.status(204).end();
      }).catch(function (error) {
        return res.status(400).json(error);
      });
    }
  }]);

  return ServiceController;
}();

exports.default = ServiceController;