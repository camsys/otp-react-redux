"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GeneralSettingsPanel;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireWildcard(require("react"));

var _CheckboxSelector = _interopRequireDefault(require("../CheckboxSelector"));

var _DropdownSelector = _interopRequireDefault(require("../DropdownSelector"));

var S = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for core-utils packages.

/**
 * The general settings panel for setting speed and routing optimization controls.
 */
function GeneralSettingsPanel({
  className = null,
  onQueryParamChange = null,
  paramNames = _coreUtils.default.query.defaultParams,
  query = null,
  queryParamMessages = null,
  style,
  supportedModes
}) {
  const handleChange = (0, _react.useCallback)(queryParam => {
    if (typeof onQueryParamChange === "function") {
      onQueryParamChange(queryParam);
    }
  }, [onQueryParamChange]);
  const configWrapper = {
    modes: supportedModes
  };
  return /*#__PURE__*/_react.default.createElement(S.GeneralSettingsPanel, {
    className: className,
    style: style
  }, paramNames.map(param => {
    const paramInfo = _coreUtils.default.queryParams.getCustomQueryParams(queryParamMessages).find(qp => qp.name === param); // Check that the parameter applies to the specified routingType


    if (!paramInfo.routingTypes.includes(query.routingType)) return null; // Check that the applicability test (if provided) is satisfied

    if (typeof paramInfo.applicable === "function" && !paramInfo.applicable(query, configWrapper)) {
      return null;
    }

    const label = _coreUtils.default.query.getQueryParamProperty(paramInfo, "label", query);

    const icon = _coreUtils.default.query.getQueryParamProperty(paramInfo, "icon", query); // Create the UI component based on the selector type


    switch (paramInfo.selector) {
      case "DROPDOWN":
        return /*#__PURE__*/_react.default.createElement(_DropdownSelector.default, {
          key: paramInfo.name,
          label: label,
          name: paramInfo.name,
          onChange: handleChange,
          options: _coreUtils.default.query.getQueryParamProperty(paramInfo, "options", query),
          value: query[paramInfo.name] || paramInfo.default
        });

      case "CHECKBOX":
        return /*#__PURE__*/_react.default.createElement(_CheckboxSelector.default, {
          key: paramInfo.label,
          label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, icon, label),
          name: paramInfo.name,
          onChange: handleChange,
          value: query[paramInfo.name]
        });

      default:
        return null;
    }
  }));
}
//# sourceMappingURL=index.js.map