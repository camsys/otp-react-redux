"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ModeSelector;

var _react = _interopRequireWildcard(require("react"));

var S = _interopRequireWildcard(require("../styled"));

var _ModeButton = _interopRequireDefault(require("../ModeButton"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * ModeSelector is the control container where the OTP user selects
 * the transportation modes for a trip query, e.g. transit+bike, walk, micromobility...
 */
function ModeSelector({
  className = null,
  modes = null,
  onChange = null,
  style = null
}) {
  const {
    primary,
    secondary,
    tertiary
  } = modes || {
    primary: null,
    secondary: null,
    tertiary: null
  };
  const handleClick = (0, _react.useCallback)(option => {
    if (!option.selected && typeof onChange === "function") {
      onChange(option.id);
    }
  }, [onChange]);

  const makeButton = option => /*#__PURE__*/_react.default.createElement(_ModeButton.default, {
    key: option.id,
    selected: option.selected,
    showTitle: option.showTitle,
    title: option.title,
    onClick: () => handleClick(option)
  }, option.text);

  return /*#__PURE__*/_react.default.createElement(S.ModeSelector, {
    className: className,
    style: style
  }, primary && /*#__PURE__*/_react.default.createElement(S.ModeSelector.MainRow, null, makeButton(primary)), secondary && /*#__PURE__*/_react.default.createElement(S.ModeSelector.SecondaryRow, null, secondary.map(makeButton)), tertiary && /*#__PURE__*/_react.default.createElement(S.ModeSelector.TertiaryRow, null, tertiary.map(makeButton)));
}
//# sourceMappingURL=index.js.map