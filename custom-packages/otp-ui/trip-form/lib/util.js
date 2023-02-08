"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBike = isBike;
exports.isFullModeOption = isFullModeOption;
exports.getModeString = getModeString;
exports.getCompaniesForModeId = getCompaniesForModeId;
exports.getTransitSubmodeOptions = getTransitSubmodeOptions;
exports.getModeOptions = getModeOptions;
exports.getCompaniesOptions = getCompaniesOptions;
exports.getBicycleOrMicromobilityModeOptions = getBicycleOrMicromobilityModeOptions;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _icons = require("@opentripplanner/icons");

var _react = _interopRequireDefault(require("react"));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for core-utils packages.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for the icons package.
const {
  hasHail,
  hasRental,
  isBicycle,
  isBicycleRent,
  isMicromobility,
  isTransit,
  isWalk
} = _coreUtils.default.itinerary;

function isBike(mode) {
  return isBicycle(mode) || isBicycleRent(mode);
}

function getSupportedExclusiveModes(intl, defaultMessages) {
  return [{
    isActive: isWalk,
    label: intl.formatMessage({
      defaultMessage: defaultMessages["otpUi.SettingsSelectorPanel.walkOnly"],
      description: "Text for walk-only mode option.",
      id: "otpUi.SettingsSelectorPanel.walkOnly"
    }),
    mode: "WALK"
  }, {
    isActive: isBike,
    label: intl.formatMessage({
      defaultMessage: defaultMessages["otpUi.SettingsSelectorPanel.bikeOnly"],
      description: "Text for bike-only mode option.",
      id: "otpUi.SettingsSelectorPanel.bikeOnly"
    }),
    mode: "BICYCLE"
  }, {
    isActive: isMicromobility,
    label: intl.formatMessage({
      defaultMessage: defaultMessages["otpUi.SettingsSelectorPanel.escooterOnly"],
      description: "Text for e-scooter-only mode option.",
      id: "otpUi.SettingsSelectorPanel.escooterOnly"
    }),
    mode: "MICROMOBILITY"
  }];
}
/**
 * Helper function so that TypeScript propagates the correct underlying type for ModeOption.
 */


function isFullModeOption(modeOption) {
  return typeof modeOption !== "string";
}
/**
 * Obtains the mode-as-a-string from a mode object found in the configuration.
 * In config.yaml, you can write either:
 *   transitModes:    -or-   transitModes:
 *   - BUS                   - mode: BUS
 *   - RAIL                    label: Bus
 *                           - mode: RAIL
 *                             label: Commuter Rail
 *
 * @param modeObj The mode object per the configuration to convert.
 */


function getModeString(modeObj) {
  return isFullModeOption(modeObj) ? modeObj.mode : modeObj;
}
/**
 * Of the specified companies, returns those that operate the specified modes.
 * @param companies The supported companies per OTP configuration.
 * @param modes The desired modes for which to get the operating companies.
 * @returns An array of companies that operate the specified modes (should not be undefined as companies is an array).
 */


function getCompanies(companies, modes) {
  return companies.filter(comp => comp.modes.split(",").filter(m => modes.includes(m)).length > 0).filter(comp => hasRental(comp.modes) || hasHail(comp.modes));
}
/**
 * Returns an array containing the company ids, in upper case for MOD UI URLs, for the specified mode id.
 * The mode id scheme is set and used by function getTransitCombinedModeOptions().
 * @param id The mode id to process.
 * @param supportedCompanies The list of supported companies (see structure in __mocks__/companies.js).
 */


function getCompaniesForModeId(id, supportedCompanies) {
  const newModes = id.split("+");
  const nonTransitModes = newModes.length > 1 ? [newModes[1]] : ["WALK"]; // TODO: for non-transit modes, should we also accommodate WALK+DRIVE, WALK+e-scooter??
  // They already seem to work without WALK right now.
  // Accommodate companies defined under accessModes.
  // Convert company ID to upper case for passing to MOD UI URL.

  const defaultAccessModeCompany = newModes.length > 2 ? [newModes[2].toUpperCase()] : null; // If there are multiple (scooter | bikeshare | etc.) companies,
  // then if one is specified in the configured modes, then use that company.
  // Otherwise, if this is for an exclusive mode (bike, scooter), then use all companies.
  // Convert company IDs to upper case for passing to MOD UI URL.
  // selectedCompanies is at least an empty array.

  const companies = defaultAccessModeCompany || getCompanies(supportedCompanies, nonTransitModes).map(comp => comp.id.toUpperCase());
  return {
    defaultAccessModeCompany,
    companies,
    nonTransitModes
  };
}
/**
 * Returns the available transit modes (rail, bus, etc.).
 * @param ModeIcon The icon component for rendering.
 * @param modes The available modes to choose from.
 * @param selectedModes The modes that should appear selected.
 */


function getTransitSubmodeOptions(ModeIcon, modes, selectedModes) {
  const {
    transitModes
  } = modes; // FIXME: If only one transit mode is available, select it.

  return transitModes.map(modeObj => {
    const modeStr = getModeString(modeObj);
    const modeLabel = isFullModeOption(modeObj) ? modeObj.label : null;
    return {
      id: modeStr,
      selected: selectedModes.includes(modeStr),
      text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(ModeIcon, {
        mode: modeStr
      }), modeLabel),
      title: modeLabel
    };
  });
}
/**
 * Returns the big primary "Take Transit" choice.
 * @param ModeIcon The icon component for rendering.
 * @param selectedModes An array of string that lists the modes selected for a trip query.
 * @param intl The IntlShape object from react-intl.
 * @param defaultMessages The default messages shown if no i18n messages are provided.
 */


function getPrimaryModeOption(ModeIcon, selectedModes, intl, defaultMessages) {
  const title = intl.formatMessage({
    defaultMessage: defaultMessages["otpUi.SettingsSelectorPanel.takeTransit"],
    description: "Label for taking transit as main mode option.",
    id: "otpUi.SettingsSelectorPanel.takeTransit"
  });
  return {
    id: "TRANSIT",
    selected: selectedModes.some(isTransit) && selectedModes.includes("WALK"),
    showTitle: false,
    text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(ModeIcon, {
      mode: "TRANSIT"
    }), title),
    title
  };
}
/**
 * Returns the transit + access mode combinations.
 * @param icons The icon set to use.
 * @param modes The available modes to choose from.
 * @param selectedModes An array of string that lists the modes selected for a trip query.
 * @param selectedCompanies The companies to show as selected.
 * @param supportedCompanies The supported companies for certain modes.
 */


function getTransitCombinedModeOptions(ModeIcon, modes, selectedModes, selectedCompanies, supportedCompanies) {
  const {
    accessModes
  } = modes;
  const modesHaveTransit = selectedModes.some(isTransit);
  return accessModes && accessModes.map(modeObj => {
    const modeStr = getModeString(modeObj);
    const {
      company: modeCompany = null,
      label: modeLabel = null
    } = isFullModeOption(modeObj) ? modeObj : {};
    const modeCompanyUpper = modeCompany === null || modeCompany === void 0 ? void 0 : modeCompany.toUpperCase();
    const company = modeCompany ? `+${modeCompany}` : "";
    const id = `TRANSIT+${modeStr}${company}`;
    const {
      companies
    } = getCompaniesForModeId(id, supportedCompanies);
    const modeMonopoly = companies[0];
    const CompanyIcon = (0, _icons.getCompanyIcon)(modeCompanyUpper || modeMonopoly || "");
    /**
     * We don't know in advance if a particular icon is supported by the ModeIcon component.
     * Therefore, for rendering, we need to know whether one of the following
     * did render something, so we know whether to fall back on the next icon.
     * Hence the regular function call syntax rather than <Tags />.
     *
     * Access mode icons are processed in the order below, so that:
     * - Any generic mode (e.g. BICYCLE_RENT) can be directly customized using `icons`,
     * - Implementers can set icons for companies not in OTP-UI or override OTP-UI icons using `icons`,
     *   using the scheme <OTP_MODE>_<COMPANY> (e.g. 'CAR_HAIL_UBER').
     * - Icons for common companies (defined in the icons package) don't need to be specified in `icons`.
     */

    const finalIcon = ModeIcon({
      mode: modeStr
    }) || ModeIcon({
      mode: `${modeStr}_${modeCompanyUpper}`
    }) || CompanyIcon && /*#__PURE__*/_react.default.createElement(CompanyIcon, null);

    return {
      id,
      selected: modesHaveTransit && selectedModes.includes(modeStr) && (!selectedCompanies.length || !modeCompanyUpper || selectedCompanies.includes(modeCompanyUpper)),
      text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(ModeIcon, {
        mode: "TRANSIT"
      }), "+", finalIcon),
      title: modeLabel
    };
  });
}
/**
 * Returns the exclusive mode options.
 * @param ModeIcon The icon component for rendering.
 * @param modes The available modes to choose from.
 * @param selectedModes An array of string that lists the modes selected for a trip query.
 * @param intl The IntlShape object from react-intl.
 * @param defaultMessages The default messages shown if no i18n messages are provided.
 */


function getExclusiveModeOptions(ModeIcon, modes, selectedModes, intl, defaultMessages) {
  const {
    exclusiveModes
  } = modes;
  return getSupportedExclusiveModes(intl, defaultMessages).filter(({
    mode
  }) => exclusiveModes && exclusiveModes.includes(mode)).map(({
    isActive,
    label,
    mode
  }) => ({
    id: mode,
    selected: !selectedModes.some(isTransit) && selectedModes.some(isActive),
    showTitle: false,
    text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(ModeIcon, {
      mode: mode
    }), " ", label),
    title: label
  }));
}
/**
 * Generates the options (primary, secondary, tertiary) for the mode selector based on the modes read from config.yaml.
 * @param ModeIcon The icon component for rendering.
 * @param modes The available modes to choose from.
 * @param selectedModes An array of string that lists the modes selected for a trip query.
 * @param selectedCompanies The companies to show as selected (when the user selects an exclusive mode operated by multiple companies).
 * @param supportedCompanies The supported companies for certain access modes.
 * @param intl The IntlShape object from react-intl.
 * @param defaultMessages The default messages shown if no i18n messages are provided.
 */


function getModeOptions(ModeIcon, modes, selectedModes, selectedCompanies, supportedCompanies, intl, defaultMessages) {
  return {
    primary: getPrimaryModeOption(ModeIcon, selectedModes, intl, defaultMessages),
    secondary: getTransitCombinedModeOptions(ModeIcon, modes, selectedModes, selectedCompanies, supportedCompanies),
    tertiary: getExclusiveModeOptions(ModeIcon, modes, selectedModes, intl, defaultMessages)
  };
}
/**
 * Returns the UI options for the specified companies, modes, and selection.
 * @param companies The supported companies per OTP configuration.
 * @param modes The desired modes for which to get the operating companies.
 * @param selectedCompanies The companies to render selected from the UI.
 * @returns An array of UI options (should not be undefined as companies is an array).
 */


function getCompaniesOptions(companies, modes, selectedCompanies) {
  return getCompanies(companies, modes).map(comp => {
    const CompanyIcon = (0, _icons.getCompanyIcon)(comp.id);
    return {
      id: comp.id,
      selected: selectedCompanies.includes(comp.id),
      text: /*#__PURE__*/_react.default.createElement("span", null, CompanyIcon && /*#__PURE__*/_react.default.createElement(CompanyIcon, null), " ", comp.label),
      title: comp.label
    };
  });
}
/**
 * Returns the UI options for the specified bike/micromobility modes and selection.
 * @param ModeIcon The component for rendering icons.
 * @param modes The supported bike or micromobility modes.
 * @param selectedModes The modes to render selected from the UI.
 * @returns An array of UI options, or undefined if modes is undefined.
 */


function getBicycleOrMicromobilityModeOptions(ModeIcon, modes, selectedModes) {
  return modes && modes.filter(isFullModeOption).map(({
    label,
    mode
  }) => ({
    id: mode,
    selected: selectedModes.includes(mode),
    text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(ModeIcon, {
      mode: mode
    }), label),
    title: label
  }));
}
//# sourceMappingURL=util.js.map