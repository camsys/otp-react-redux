// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for core-utils packages.
import coreUtils from "@opentripplanner/core-utils";
import React, { useCallback } from "react";
import CheckboxSelector from "../CheckboxSelector";
import DropdownSelector from "../DropdownSelector";
import * as S from "../styled"; // eslint-disable-next-line prettier/prettier

/**
 * The general settings panel for setting speed and routing optimization controls.
 */
export default function GeneralSettingsPanel(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className,
      _ref$onQueryParamChan = _ref.onQueryParamChange,
      onQueryParamChange = _ref$onQueryParamChan === void 0 ? null : _ref$onQueryParamChan,
      _ref$paramNames = _ref.paramNames,
      paramNames = _ref$paramNames === void 0 ? coreUtils.query.defaultParams : _ref$paramNames,
      _ref$query = _ref.query,
      query = _ref$query === void 0 ? null : _ref$query,
      _ref$queryParamMessag = _ref.queryParamMessages,
      queryParamMessages = _ref$queryParamMessag === void 0 ? null : _ref$queryParamMessag,
      style = _ref.style,
      supportedModes = _ref.supportedModes;
  var handleChange = useCallback(function (queryParam) {
    if (typeof onQueryParamChange === "function") {
      onQueryParamChange(queryParam);
    }
  }, [onQueryParamChange]);
  var configWrapper = {
    modes: supportedModes
  };
  return /*#__PURE__*/React.createElement(S.GeneralSettingsPanel, {
    className: className,
    style: style
  }, paramNames.map(function (param) {
    var paramInfo = coreUtils.queryParams.getCustomQueryParams(queryParamMessages).find(function (qp) {
      return qp.name === param;
    }); // Check that the parameter applies to the specified routingType

    if (!paramInfo.routingTypes.includes(query.routingType)) return null; // Check that the applicability test (if provided) is satisfied

    if (typeof paramInfo.applicable === "function" && !paramInfo.applicable(query, configWrapper)) {
      return null;
    }

    var label = coreUtils.query.getQueryParamProperty(paramInfo, "label", query);
    var icon = coreUtils.query.getQueryParamProperty(paramInfo, "icon", query); // Create the UI component based on the selector type

    switch (paramInfo.selector) {
      case "DROPDOWN":
        return /*#__PURE__*/React.createElement(DropdownSelector, {
          key: paramInfo.name,
          label: label,
          name: paramInfo.name,
          onChange: handleChange,
          options: coreUtils.query.getQueryParamProperty(paramInfo, "options", query),
          value: query[paramInfo.name] || paramInfo["default"]
        });

      case "CHECKBOX":
        return /*#__PURE__*/React.createElement(CheckboxSelector, {
          key: paramInfo.label,
          label: /*#__PURE__*/React.createElement(React.Fragment, null, icon, label),
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