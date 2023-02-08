"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SettingsSelectorPanel;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _icons = require("@opentripplanner/icons");

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _ModeSelector = _interopRequireDefault(require("../ModeSelector"));

var _SubmodeSelector = _interopRequireDefault(require("../SubmodeSelector"));

var _GeneralSettingsPanel = _interopRequireDefault(require("../GeneralSettingsPanel"));

var S = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

var _queryParamsI18n = require("./query-params-i18n");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for core-utils packages.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.
const {
  isMicromobility,
  isTransit
} = _coreUtils.default.itinerary;

function getSelectedCompanies(queryParams) {
  const {
    companies
  } = queryParams;
  return companies ? companies.split(",") : [];
}

function getSelectedModes(queryParams) {
  const {
    mode
  } = queryParams;
  const modes = mode ? mode.split(",") : []; // Map OTP Flex modes to custom flex mode

  return _coreUtils.default.query.reduceOtpFlexModes(modes);
}
/**
 * The Settings Selector Panel allows the user to set trip search preferences,
 * such as modes, providers, and speed preferences.
 */


function SettingsSelectorPanel({
  className = null,
  ModeIcon = _icons.TriMetModeIcon,
  onQueryParamChange = null,
  queryParams = null,
  queryParamMessages = null,
  style = null,
  supportedCompanies = [],
  supportedModes = null
}) {
  const [defaultAccessModeCompany, setDefaultAccessModeCompany] = (0, _react.useState)(null);
  const [lastTransitModes, setLastTransitModes] = (0, _react.useState)([]);
  const selectedModes = getSelectedModes(queryParams);
  const selectedCompanies = getSelectedCompanies(queryParams);
  const handleQueryParamChange = (0, _react.useCallback)(queryParam => {
    if (typeof onQueryParamChange === "function") {
      onQueryParamChange(queryParam);
    }
  }, [onQueryParamChange]);
  const toggleSubmode = (0, _react.useCallback)((name, id, submodes, filter = o => o, after) => {
    const newSubmodes = [].concat(submodes);
    const idx = newSubmodes.indexOf(id); // If the clicked mode is selected, then unselect it, o/w select it.
    // Leave at least one selected, as in newplanner.trimet.org.

    if (idx >= 0) {
      const subset = newSubmodes.filter(filter);

      if (subset.length >= 2) {
        newSubmodes.splice(idx, 1);
      }
    } else {
      newSubmodes.push(id);
    }

    if (newSubmodes.length !== submodes.length) {
      handleQueryParamChange({
        [name]: newSubmodes.join(",")
      });
      if (after) after(newSubmodes);
    }
  }, [onQueryParamChange]);
  const handleMainModeChange = (0, _react.useCallback)(id => {
    const newModes = id.split("+");

    if (newModes[0] === "TRANSIT") {
      const activeTransitModes = selectedModes.filter(isTransit);
      const lastOrAllTransitModes = lastTransitModes.length === 0 ? supportedModes.transitModes.map(_util.getModeString) : lastTransitModes;
      const {
        defaultAccessModeCompany: defAccessModeCompany,
        companies,
        nonTransitModes
      } = (0, _util.getCompaniesForModeId)(id, supportedCompanies); // Add previously selected transit modes only if none were active.

      const finalModes = (activeTransitModes.length > 0 ? activeTransitModes : lastOrAllTransitModes).concat(nonTransitModes);
      handleQueryParamChange({
        companies: companies.join(","),
        mode: finalModes.join(",")
      });
      setDefaultAccessModeCompany(defAccessModeCompany && defAccessModeCompany[0]);
    } else {
      handleQueryParamChange({
        companies: "",
        // New req: Don't list companies with this mode?
        mode: newModes.join(",")
      });
    }
  }, [onQueryParamChange, queryParams, lastTransitModes]);
  const handleTransitModeChange = (0, _react.useCallback)(id => toggleSubmode("mode", id, selectedModes, isTransit, newModes => setLastTransitModes(newModes.filter(isTransit))), [onQueryParamChange, queryParams]);
  const handleCompanyChange = (0, _react.useCallback)(id => toggleSubmode("companies", id, selectedCompanies, undefined, () => {}), [onQueryParamChange, queryParams]);
  const intl = (0, _reactIntl.useIntl)();
  const queryParamMessagesWithI18nAndCustomizations = { ...(0, _queryParamsI18n.getQueryParamMessagesWithI18n)(intl),
    ...queryParamMessages
  };
  const modeOptions = (0, _util.getModeOptions)(ModeIcon, supportedModes, selectedModes, selectedCompanies, supportedCompanies, intl, _queryParamsI18n.defaultMessages);
  const transitModes = (0, _util.getTransitSubmodeOptions)(ModeIcon, supportedModes, selectedModes);
  const nonTransitModes = selectedModes.filter(m => !isTransit(m));
  const companies = (0, _util.getCompaniesOptions)(supportedCompanies.filter(comp => defaultAccessModeCompany ? comp.id === defaultAccessModeCompany : true), nonTransitModes, selectedCompanies);
  const bikeModes = (0, _util.getBicycleOrMicromobilityModeOptions)(ModeIcon, supportedModes.bicycleModes, selectedModes);
  const scooterModes = (0, _util.getBicycleOrMicromobilityModeOptions)(ModeIcon, supportedModes.micromobilityModes, selectedModes);

  const submodeLabel = /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _queryParamsI18n.defaultMessages["otpUi.SettingsSelectorPanel.use"],
    description: "Text announcing a list of submodes to use.",
    id: "otpUi.SettingsSelectorPanel.use"
  });

  const submodeCompaniesLabel = /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _queryParamsI18n.defaultMessages["otpUi.SettingsSelectorPanel.useCompanies"],
    description: "Text announcing a list of rental companies to use.",
    id: "otpUi.SettingsSelectorPanel.useCompanies"
  });

  return /*#__PURE__*/_react.default.createElement(S.SettingsSelectorPanel, {
    className: className,
    style: style
  }, /*#__PURE__*/_react.default.createElement(_ModeSelector.default, {
    modes: modeOptions,
    onChange: handleMainModeChange,
    style: {
      margin: "0px -5px",
      paddingBottom: "8px"
    }
  }), /*#__PURE__*/_react.default.createElement(S.SettingsHeader, null, /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
    defaultMessage: _queryParamsI18n.defaultMessages["otpUi.SettingsSelectorPanel.travelPreferences"],
    description: "Header text for the travel preferences.",
    id: "otpUi.SettingsSelectorPanel.travelPreferences"
  })), selectedModes.some(isTransit) && transitModes.length >= 2 && /*#__PURE__*/_react.default.createElement(_SubmodeSelector.default, {
    label: submodeLabel,
    modes: transitModes,
    onChange: handleTransitModeChange
  }), selectedModes.some(_util.isBike) && !selectedModes.some(isTransit) && /*#__PURE__*/_react.default.createElement(_SubmodeSelector.default, {
    label: submodeLabel,
    inline: true,
    modes: bikeModes,
    onChange: handleMainModeChange
  }), selectedModes.some(isMicromobility) && !selectedModes.some(isTransit) && /*#__PURE__*/_react.default.createElement(_SubmodeSelector.default, {
    label: submodeLabel,
    inline: true,
    modes: scooterModes,
    onChange: handleMainModeChange
  }), companies.length >= 2 && /*#__PURE__*/_react.default.createElement(_SubmodeSelector.default, {
    label: submodeCompaniesLabel,
    modes: companies,
    onChange: handleCompanyChange
  }), /*#__PURE__*/_react.default.createElement(_GeneralSettingsPanel.default, {
    query: queryParams,
    queryParamMessages: queryParamMessagesWithI18nAndCustomizations,
    supportedModes: supportedModes,
    onQueryParamChange: handleQueryParamChange
  }));
}
//# sourceMappingURL=index.js.map