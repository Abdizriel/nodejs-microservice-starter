'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = require('./service.controller');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceRoutes = function () {
  function ServiceRoutes() {
    _classCallCheck(this, ServiceRoutes);
  }

  _createClass(ServiceRoutes, null, [{
    key: 'init',
    value: function init(router) {
      router.route('/services').get(_service2.default.list).post(_service2.default.create);
      '';
      router.route('/services/:id').get(_service2.default.show).put(_service2.default.update).delete(_service2.default.delete);
    }
  }]);

  return ServiceRoutes;
}();

exports.default = ServiceRoutes;