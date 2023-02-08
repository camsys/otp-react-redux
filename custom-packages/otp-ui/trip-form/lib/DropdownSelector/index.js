"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DropdownSelector;

var _react = _interopRequireWildcard(require("react"));

var S = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * A wrapper that includes a <select> dropdown control and a <label> for the dropdown control.
 */
function DropdownSelector({
  className = null,
  label = null,
  name = null,
  onChange = null,
  options = null,
  style = null,
  value = null
}) {
  const handleChange = (0, _react.useCallback)(evt => {
    if (typeof onChange === "function") {
      const val = evt.target.value;
      const floatVal = parseFloat(val);
      onChange({
        [name]: Number.isNaN(floatVal) ? val : floatVal
      });
    }
  }, [onChange]);
  const id = `id-query-param-${name}`;
  return /*#__PURE__*/_react.default.createElement(S.DropdownSelector, {
    className: className,
    style: style
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(S.SettingLabel, {
    htmlFor: id
  }, label)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("select", {
    id: id,
    value: value,
    onChange: handleChange
  }, options && options.map((o, i) => /*#__PURE__*/_react.default.createElement("option", {
    key: i,
    value: o.value
  }, o.text)))));
}
//# sourceMappingURL=index.js.map