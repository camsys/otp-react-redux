"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var Icons = _interopRequireWildcard(require("@opentripplanner/icons"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.
const submodeOptions = [{
  id: "BUS",
  title: "Use the bus",
  text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(Icons.Bus, null), " Bus")
}, {
  id: "TRAM",
  selected: true,
  title: "Use the streetcar",
  text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(Icons.Streetcar, null), " Streetcar")
}, {
  id: "UBER",
  selected: true,
  title: "Uber",
  text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(Icons.Uber, null), " Uber")
}];
var _default = submodeOptions;
exports.default = _default;
//# sourceMappingURL=submode-options.js.map