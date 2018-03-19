'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _responsive = require('@vx/responsive');

var _gradient = require('@vx/gradient');

var _chart = require('../components/chart.js');

var _chart2 = _interopRequireDefault(_chart);

var _formatPrice = require('../utils/formatPrice.js');

var _formatPrice2 = _interopRequireDefault(_formatPrice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Background(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return _react2.default.createElement('svg', { width: width, height: height }, _react2.default.createElement(_gradient.LinearGradient, { id: 'fill', vertical: false }, _react2.default.createElement('stop', { stopColor: '#b993d6', offset: '0%' }), _react2.default.createElement('stop', { stopColor: '#8ca6db', offset: '100%' })), _react2.default.createElement('rect', { width: width, height: height, fill: 'url(#fill)' }));
}

var App = function (_React$Component) {
  (0, _inherits3.default)(App, _React$Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

    _this.state = {
      data: {}
    };
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      fetch('https://api.coindesk.com/v1/bpi/historical/close.json').then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.setState({
          data: json
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          screenWidth = _props.screenWidth,
          screenHeight = _props.screenHeight;
      var data = this.state.data;
      // console.log(data)

      if (!data.bpi) return _react2.default.createElement('div', null, ' loading... ');
      var prices = (0, _keys2.default)(data.bpi).map(function (k) {
        return {
          time: k,
          price: data.bpi[k]
        };
      });
      var currentPrice = prices[prices.length - 1].price;
      var firstPrice = prices[0].price;
      var diffPrice = currentPrice - firstPrice;
      var hasIncreased = diffPrice > 0;

      return _react2.default.createElement('div', { className: 'app', 'data-jsx': 869255564
      }, _react2.default.createElement(Background, { width: screenWidth, height: screenHeight }), _react2.default.createElement('div', { className: 'center', 'data-jsx': 869255564
      }, _react2.default.createElement('div', { className: 'chart', 'data-jsx': 869255564
      }, _react2.default.createElement('div', { className: 'titlebar', 'data-jsx': 869255564
      }, _react2.default.createElement('div', { className: 'title', 'data-jsx': 869255564
      }, _react2.default.createElement('div', {
        'data-jsx': 869255564
      }, ' Bitcoin Price '), _react2.default.createElement('div', {
        'data-jsx': 869255564
      }, _react2.default.createElement('small', {
        'data-jsx': 869255564
      }, ' Last 30 days '))), _react2.default.createElement('div', { className: 'spacer', 'data-jsx': 869255564
      }), _react2.default.createElement('div', { className: 'prices', 'data-jsx': 869255564
      }, _react2.default.createElement('div', {
        'data-jsx': 869255564
      }, (0, _formatPrice2.default)(currentPrice)), _react2.default.createElement('div', { className: hasIncreased ? 'increased' : 'decreased', 'data-jsx': 869255564
      }, _react2.default.createElement('small', {
        'data-jsx': 869255564
      }, hasIncreased ? '+' : '-', (0, _formatPrice2.default)(diffPrice))))), _react2.default.createElement('div', { className: 'container', 'data-jsx': 869255564
      }, _react2.default.createElement(_chart2.default, { data: prices }))), _react2.default.createElement('p', { className: 'disclaimer', 'data-jsx': 869255564
      }, data.disclaimer)), _react2.default.createElement(_style2.default, {
        styleId: 869255564,
        css: '.app[data-jsx="869255564"],.center[data-jsx="869255564"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:absolute;top:0;left:0;right:0;bottom:0;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-family:arial;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.container[data-jsx="869255564"]{-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.spacer[data-jsx="869255564"]{-webkit-flex:1;-ms-flex:1;flex:1}.prices[data-jsx="869255564"]{-webkit-align-items:flex-end;-webkit-box-align:flex-end;-ms-flex-align:flex-end;align-items:flex-end;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.increased[data-jsx="869255564"]{color:#00f1a1}.decreased[data-jsx="869255564"]{color:\'#ff0000\'}.titlebar[data-jsx="869255564"]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:15px}.chart[data-jsx="869255564"]{width:600px;height:400px;background-color:#27273f;border-radius:8px;color:white;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.disclaimer[data-jsx="869255564"]{color:white;opacity:0.4;font-size:14px}'
      }));
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = (0, _responsive.withScreenSize)(App);