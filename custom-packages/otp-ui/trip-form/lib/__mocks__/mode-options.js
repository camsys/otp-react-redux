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
const modeOptions = {
  primary: {
    id: "PRIMARY",
    title: "Primary Choice",
    text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(Icons.Max, null), /*#__PURE__*/_react.default.createElement(Icons.Bus, null), " Primary Choice")
  },
  secondary: [{
    id: "SECONDARY1",
    title: "Secondary 1",
    text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(Icons.Bike, null), " Sec. #1")
  }, {
    id: "SECONDARY2",
    title: "Secondary 2",
    selected: true,
    showTitle: false,
    text: /*#__PURE__*/_react.default.createElement("span", null, "Sec. #2 ", /*#__PURE__*/_react.default.createElement(Icons.Micromobility, null))
  }],
  tertiary: [{
    id: "OTHER",
    title: "Other Mode",
    text: /*#__PURE__*/_react.default.createElement("span", null, "Tertiary Mode")
  }]
};
var _default = modeOptions;
exports.default = _default;
//# sourceMappingURL=mode-options.js.map