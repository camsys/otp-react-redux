"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OptionButton;

var _react = _interopRequireDefault(require("react"));

var S = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function OptionButton({
  checkboxIcons,
  checked,
  children,
  className,
  disabled,
  iconFillOverride,
  image,
  label,
  onClick,
  selected
}) {
  const GreenCheck = (checkboxIcons === null || checkboxIcons === void 0 ? void 0 : checkboxIcons.checked) || S.GreenCheck;
  const PlusIcon = (checkboxIcons === null || checkboxIcons === void 0 ? void 0 : checkboxIcons.unchecked) || S.UncheckedIcon;
  return /*#__PURE__*/_react.default.createElement(S.OptionButton, {
    ariaChecked: selected,
    ariaLabel: label,
    className: className,
    disabled: disabled,
    onClick: onClick,
    selected: selected
  }, /*#__PURE__*/_react.default.createElement(S.OptionImage, {
    title: image && `image for ${label}`,
    iconFillOverride: iconFillOverride,
    key: label,
    src: image
  }), /*#__PURE__*/_react.default.createElement(S.OptionLabel, null, label), /*#__PURE__*/_react.default.createElement(S.OptionIcon, null, checked ? /*#__PURE__*/_react.default.createElement(GreenCheck, null) : /*#__PURE__*/_react.default.createElement(PlusIcon, null)), children);
}
//# sourceMappingURL=OptionButton.js.map