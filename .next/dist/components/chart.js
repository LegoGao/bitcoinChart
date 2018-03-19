'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _responsive = require('@vx/responsive');

var _scale = require('@vx/scale');

var _shape = require('@vx/shape');

var _gradient = require('@vx/gradient');

var _axis = require('@vx/axis');

var _tooltip = require('@vx/tooltip');

var _d3Array = require('d3-array');

var _event = require('@vx/event');

var _formatPrice = require('../utils/formatPrice');

var _formatPrice2 = _interopRequireDefault(_formatPrice);

var _maxprice = require('./maxprice.js');

var _maxprice2 = _interopRequireDefault(_maxprice);

var _minprice = require('./minprice.js');

var _minprice2 = _interopRequireDefault(_minprice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chart = function (_React$Component) {
  (0, _inherits3.default)(Chart, _React$Component);

  function Chart(props) {
    (0, _classCallCheck3.default)(this, Chart);

    return (0, _possibleConstructorReturn3.default)(this, (Chart.__proto__ || (0, _getPrototypeOf2.default)(Chart)).call(this, props));
  }

  (0, _createClass3.default)(Chart, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          parentWidth = _props.parentWidth,
          parentHeight = _props.parentHeight,
          tooltipLeft = _props.tooltipLeft,
          tooltipTop = _props.tooltipTop,
          tooltipData = _props.tooltipData,
          showTooltip = _props.showTooltip,
          hideTooltip = _props.hideTooltip;

      var margin = {
        top: 15,
        bottom: 40,
        left: 0,
        right: 0
      };

      var width = parentWidth - margin.left - margin.right;
      var height = parentHeight - margin.top - margin.bottom;

      var bisectDate = (0, _d3Array.bisector)(function (d) {
        return x(d);
      }).left;

      var x = function x(data) {
        return new Date(data.time);
      };
      var y = function y(data) {
        return data.price;
      };
      var firstPoint = data[0];
      var currentPoint = data[data.length - 1];

      var minPrice = Math.min.apply(Math, (0, _toConsumableArray3.default)(data.map(y)));
      var maxPrice = Math.max.apply(Math, (0, _toConsumableArray3.default)(data.map(y)));

      var maxPriceData = [{
        time: x(firstPoint),
        price: maxPrice
      }, {
        time: x(currentPoint),
        price: maxPrice
      }];

      var minPriceData = [{
        time: x(firstPoint),
        price: minPrice
      }, {
        time: x(currentPoint),
        price: minPrice
      }];

      var xScale = (0, _scale.scaleTime)({
        range: [0, width],
        domain: [Math.min.apply(Math, (0, _toConsumableArray3.default)(data.map(x))), Math.max.apply(Math, (0, _toConsumableArray3.default)(data.map(x)))]
      });

      var yScale = (0, _scale.scaleLinear)({
        range: [height, 0],
        domain: [minPrice, maxPrice]
      });

      // console.log(xScale.domain())

      return _react2.default.createElement('div', null, _react2.default.createElement('svg', { ref: function ref(s) {
          return _this2.svg = s;
        }, width: width, height: parentHeight }, _react2.default.createElement(_axis.AxisBottom, {
        data: data,
        scale: xScale,
        x: x,
        top: yScale(minPrice),
        hideAxisLine: true,
        hideTicks: true,
        numTicks: 4,
        tickLabelComponent: _react2.default.createElement('text', { fill: '#ffffff', fontSize: 11 })
      }), _react2.default.createElement(_gradient.LinearGradient, {
        id: 'area-fill',
        from: '#b993d6',
        to: '#8ca6db',
        fromOpacity: .3,
        toOpacity: 0

      }), _react2.default.createElement(_shape.AreaClosed, {
        data: data,
        yScale: yScale,
        xScale: xScale,
        x: x,
        y: y,
        fill: 'url(#area-fill)',
        stroke: 'transparent'
      }), _react2.default.createElement(_maxprice2.default, {
        data: maxPriceData,
        yScale: yScale,
        xScale: xScale,
        x: x,
        y: y,
        label: (0, _formatPrice2.default)(maxPrice),
        yText: yScale(maxPrice)
      }), _react2.default.createElement(_minprice2.default, {
        data: minPriceData,
        yScale: yScale,
        xScale: xScale,
        x: x,
        y: y,
        label: (0, _formatPrice2.default)(minPrice),
        yText: yScale(minPrice)
      }), _react2.default.createElement(_shape.LinePath, {
        data: data,
        yScale: yScale,
        xScale: xScale,
        x: x,
        y: y
      }), _react2.default.createElement(_shape.Bar, {
        data: data,
        width: width,
        height: height,
        fill: 'transparent',
        onMouseMove: function onMouseMove(data) {
          return function (event) {
            var _localPoint = (0, _event.localPoint)(_this2.svg, event),
                xPoint = _localPoint.x;

            var x0 = xScale.invert(xPoint);
            var index = bisectDate(data, x0, 1);
            var d0 = data[index - 1];
            var d1 = data[index];
            var d = x0 - xScale(x(d0)) > xScale(x(d1)) - x0 ? d1 : d0;
            showTooltip({
              tooltipLeft: xScale(x(d)),
              tooltipTop: yScale(x(d)),
              tooltipData: d
            });
          };
        },
        onMouseLeave: function onMouseLeave(data) {
          return function (event) {};
        }
      }), tooltipData && _react2.default.createElement('g', null, _react2.default.createElement(_shape.Line, {
        from: { x: tooltipLeft, y: yScale(y(maxPriceData[0])) },
        to: {
          x: tooltipLeft,
          y: yScale(y(minPriceData[0]))
        },
        stroke: '#ffffff',
        strokeDasharray: '2,2'
      }), _react2.default.createElement('circle', {
        r: '6',
        cx: tooltipLeft,
        cy: tooltipTop

      }))), tooltipData && _react2.default.createElement(_tooltip.Tooltip, {
        top: tooltipTop,
        left: tooltipLeft
      }, (0, _formatPrice2.default)(x(tooltipData))));
    }
  }]);

  return Chart;
}(_react2.default.Component);

exports.default = (0, _responsive.withParentSize)((0, _tooltip.withTooltip)(Chart));