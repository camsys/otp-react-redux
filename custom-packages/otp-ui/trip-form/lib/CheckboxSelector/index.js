"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CheckboxSelector;

var _react = _interopRequireWildcard(require("react"));

var S = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * A wrapper that includes an <input type="select" /> control and a <label> for the input control.
 */
function CheckboxSelector({
  className = null,
  label = null,
  name = null,
  onChange = null,
  style,
  value = null
}) {
  const handleChange = (0, _react.useCallback)(evt => {
    if (typeof onChange === "function") {
      onChange({
        [name]: evt.target.checked
      });
    }
  }, [onChange]);
  const id = `id-query-param-${name}`;
  const finalValue = typeof value === "string" ? value === "true" : value;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    style: style
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: id,
    type: "checkbox",
    checked: finalValue,
    onChange: handleChange
  }), /*#__PURE__*/_react.default.createElement(S.SettingLabel, {
    htmlFor: id
  }, label));
}
//# sourceMappingURL=index.js.map