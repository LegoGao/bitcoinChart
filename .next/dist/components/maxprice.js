"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _shape = require("@vx/shape");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var data = _ref.data,
      label = _ref.label,
      yText = _ref.yText,
      yScale = _ref.yScale,
      xScale = _ref.xScale,
      x = _ref.x,
      y = _ref.y;

  return _react2.default.createElement("g", null, _react2.default.createElement(_shape.LinePath, {
    data: data,
    yScale: yScale,
    xScale: xScale,
    x: x,
    y: y,
    strokeDasharray: "4,4",
    strokeOpacity: "0.4"
  }), _react2.default.createElement("text", { fill: "#6086d6", dy: "1.3em", dx: "1em", y: yText, fontSize: "12" }, label));
};