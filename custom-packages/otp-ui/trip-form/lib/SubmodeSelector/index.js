"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SubmodeSelector;

var _react = _interopRequireDefault(require("react"));

var _ModeButton = _interopRequireDefault(require("../ModeButton"));

var S = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * SubmodeSelector is the control container where the OTP user selects
 * the submodes (e.g. train, bus) for transit, or the providers for TNC and rental companies.
 */
function SubmodeSelector({
  className = null,
  inline = false,
  label = null,
  modes = null,
  onChange = null,
  style = null
}) {
  const LabelType = inline ? S.FloatingSettingLabel : S.SettingLabel;
  const RowType = inline ? S.SubmodeSelector.InlineRow : S.SubmodeSelector.Row;
  return /*#__PURE__*/_react.default.createElement(S.SubmodeSelector, {
    className: className,
    style: style
  }, label && /*#__PURE__*/_react.default.createElement(LabelType, null, label), /*#__PURE__*/_react.default.createElement(RowType, null, modes && modes.map(option => /*#__PURE__*/_react.default.createElement(_ModeButton.default, {
    key: option.id,
    selected: option.selected,
    showTitle: false,
    title: option.title,
    onClick: () => onChange(option.id)
  }, option.text))));
}
//# sourceMappingURL=index.js.map