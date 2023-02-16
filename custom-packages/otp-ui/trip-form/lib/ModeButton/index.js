"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ModeButton;

var _react = _interopRequireDefault(require("react"));

var S = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * ModeButton lets the user pick a travel mode.
 * It includes the actual button that supports HTML/React text and graphics,
 * and a title displayed when hovering the mouse over the button, and, optionally, underneath it.
 * A ModeButton can be enabled or disabled, active or inactive.
 */
function ModeButton({
  className = null,
  children = null,
  enabled = true,
  onClick = null,
  selected = false,
  showTitle = true,
  title = null,
  style = null
}) {
  const activeClassName = selected ? "active" : "";
  const disabledClassName = enabled ? "" : "disabled";
  return /*#__PURE__*/_react.default.createElement(S.ModeButton, {
    className: className,
    style: style
  }, /*#__PURE__*/_react.default.createElement(S.ModeButton.Button, {
    "aria-pressed": selected,
    className: `${activeClassName} ${disabledClassName}`,
    disabled: !enabled,
    onClick: onClick,
    title: title
  }, children), title && showTitle && /*#__PURE__*/_react.default.createElement(S.ModeButton.Title, {
    className: `${activeClassName} ${disabledClassName}`,
    title: title
  }, title));
}
//# sourceMappingURL=index.js.map