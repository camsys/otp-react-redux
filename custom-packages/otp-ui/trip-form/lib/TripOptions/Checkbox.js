"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Checkbox;

var _react = _interopRequireDefault(require("react"));

var _icons = require("@opentripplanner/icons");

var S = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.
function Checkbox(props) {
  const {
    ariaChecked,
    ariaLabel,
    checkboxIcons,
    checked,
    children,
    className,
    disabled,
    innerRef,
    inset,
    mode,
    onClick,
    selected,
    // If no icon is passed, TriMetModIcon is the default
    SimpleModeIcon = _icons.TriMetModeIcon2021
  } = props;

  const modeIcon = mode && /*#__PURE__*/_react.default.createElement(SimpleModeIcon, {
    mode: mode
  });

  const GreenCheck = (checkboxIcons === null || checkboxIcons === void 0 ? void 0 : checkboxIcons.checked) || S.GreenCheck;
  const PlusIcon = (checkboxIcons === null || checkboxIcons === void 0 ? void 0 : checkboxIcons.unchecked) || S.UncheckedIcon;
  return /*#__PURE__*/_react.default.createElement(S.Checkbox, {
    ariaChecked: ariaChecked,
    ariaLabel: ariaLabel,
    className: className,
    disabled: disabled,
    inset: inset,
    mode: mode,
    ref: innerRef,
    onClick: onClick,
    selected: selected
  }, mode && /*#__PURE__*/_react.default.createElement(S.ModeIconWrapper, null, modeIcon), checked ? /*#__PURE__*/_react.default.createElement(GreenCheck, null) : /*#__PURE__*/_react.default.createElement(PlusIcon, null), children);
}
//# sourceMappingURL=Checkbox.js.map