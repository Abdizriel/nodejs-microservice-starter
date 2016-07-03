'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressContentLengthValidator = require('express-content-length-validator');

var _expressContentLengthValidator2 = _interopRequireDefault(_expressContentLengthValidator);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApplicationConfig = function () {
  function ApplicationConfig() {
    _classCallCheck(this, ApplicationConfig);
  }

  _createClass(ApplicationConfig, null, [{
    key: 'init',
    value: function init(app) {
      var _root = process.cwd();
      var _nodeModules = '/node_modules/';

      app.use(_express2.default.static(_root + _nodeModules));
      app.use(_bodyParser2.default.json());
      app.use((0, _morgan2.default)('dev'));
      app.use(_expressContentLengthValidator2.default.validateMax({ max: 999 }));
      app.use((0, _helmet2.default)());
    }
  }]);

  return ApplicationConfig;
}();

exports.default = ApplicationConfig;