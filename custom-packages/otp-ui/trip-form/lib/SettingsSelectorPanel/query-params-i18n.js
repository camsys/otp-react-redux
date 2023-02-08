"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryParamMessagesWithI18n = getQueryParamMessagesWithI18n;
exports.defaultMessages = void 0;

var _flat = _interopRequireDefault(require("flat"));

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _enUS = _interopRequireDefault(require("../../i18n/en-US.yml"));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for core-utils packages.
// Load the default messages.
// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
const defaultMessages = (0, _flat.default)(_enUS.default);
exports.defaultMessages = defaultMessages;
const {
  hasTransit
} = _coreUtils.default.itinerary;
const METERS_PER_MILE = 1609.3;
const SECONDS_PER_HOUR = 3600;
/**
 * Rounds a distance to the nearest integer if over 1000 meters.
 * Leave one decimal point otherwise.
 * (This is to be consistent with the rounding scheme in core-utils/query-params.)
 * @param meters The distance in meters to round.
 */

function roundMeters(meters) {
  if (meters >= 1000) return Math.round(meters);
  return Math.round(meters * 10) / 10;
}
/**
 * Gets a list of duration options.
 */


function getDurationOptions(intl, minuteOptions) {
  // intl is needed because <FormattedMessage> can't be used inside <option>.
  return minuteOptions.map(minutes => ({
    text: minutes === 60 ? intl.formatNumber(1, {
      style: "unit",
      unit: "hour",
      unitDisplay: "long"
    }) : intl.formatNumber(minutes, {
      style: "unit",
      unit: "minute",
      unitDisplay: "long"
    }),
    value: minutes
  }));
}
/**
 * Gets a list of distance options in miles.
 */


function getDistanceOptionsInMiles(intl, mileOptions) {
  // intl is needed because <FormattedMessage> can't be used inside <option>.
  return mileOptions.map(miles => ({
    text: intl.formatMessage({
      defaultMessage: `${miles} miles`,
      description: "Displays a distance in miles",
      id: "otpUi.queryParameters.distanceInMiles"
    }, {
      // 1 mile = 100 "centimiles". Pass that so that formatjs can pick up
      // English exceptions for 1/10 mile, 1/4 mile, etc.
      // (Decimal numbers don't work for the case selector.)
      centimiles: miles * 100,
      miles
    }).trim(),
    value: roundMeters(miles * METERS_PER_MILE)
  }));
}
/**
 * Gets a list of speed options in miles per hour.
 */


function getSpeedOptionsInMilesPerHour(intl, milesPerHourOptions) {
  // intl is needed because <FormattedMessage> can't be used inside <option>.
  return milesPerHourOptions.map(mph => ({
    text: intl.formatMessage({
      defaultMessage: `${mph} mph`,
      description: "Displays a speed in miles per hour",
      id: "otpUi.queryParameters.speedInMilesPerHour"
    }, {
      mph
    }),
    value: Number((mph * METERS_PER_MILE / SECONDS_PER_HOUR).toFixed(2))
  }));
}
/**
 * Gets the bike trip optimization options.
 */


function getBikeTripOptions(intl, queryParams) {
  const opts = [{
    text: intl.formatMessage({
      defaultMessage: defaultMessages["otpUi.queryParameters.optimizeBikeSpeed"],
      description: "Option label for speed",
      id: "otpUi.queryParameters.optimizeBikeSpeed"
    }),
    value: "QUICK"
  }, {
    text: intl.formatMessage({
      defaultMessage: defaultMessages["otpUi.queryParameters.optimizeBikeFriendly"],
      description: "Option label for bike-friendly trips",
      id: "otpUi.queryParameters.optimizeBikeFriendly"
    }),
    value: "SAFE"
  }, {
    text: intl.formatMessage({
      defaultMessage: defaultMessages["otpUi.queryParameters.optimizeBikeFlat"],
      description: "Option label for flat bike trips",
      id: "otpUi.queryParameters.optimizeBikeFlat"
    }),
    value: "FLAT"
  }]; // Include transit-specific option, if applicable

  if (hasTransit(queryParams.mode)) {
    opts.splice(1, 0, {
      text: intl.formatMessage({
        defaultMessage: defaultMessages["otpUi.queryParameters.optimizeTransfers"],
        description: "Option label for fewest transfers",
        id: "otpUi.queryParameters.optimizeTransfers"
      }),
      value: "TRANSFERS"
    });
  }

  return opts;
}
/**
 * Obtains a set of custom query parameters with localized labels and options.
 */


function getQueryParamMessagesWithI18n(intl) {
  return {
    maxWalkDistance: {
      label: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.queryParameters.maxWalkDistance"],
        description: "Max walk distance label",
        id: "otpUi.queryParameters.maxWalkDistance"
      }),
      options: getDistanceOptionsInMiles(intl, [0.1, 0.25, 0.5, 0.75, 1, 2, 5])
    },
    maxBikeDistance: {
      label: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.queryParameters.maxBikeDistance"],
        description: "Max bike distance label",
        id: "otpUi.queryParameters.maxBikeDistance"
      }),
      options: getDistanceOptionsInMiles(intl, [0.25, 0.5, 0.75, 1, 2, 3, 5, 10, 20, 30])
    },
    optimize: {
      label: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.queryParameters.optimizeFor"],
        description: "Optimize selector label",
        id: "otpUi.queryParameters.optimizeFor"
      }),
      options: [{
        text: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.queryParameters.optimizeQuick"],
          description: "Option label for quickest trips",
          id: "otpUi.queryParameters.optimizeQuick"
        }),
        value: "QUICK"
      }, {
        text: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.queryParameters.optimizeTransfers"],
          description: "Option label for fewest transfers",
          id: "otpUi.queryParameters.optimizeTransfers"
        }),
        value: "TRANSFERS"
      }]
    },
    optimizeBike: {
      label: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.queryParameters.optimizeFor"],
        description: "Optimize selector label",
        id: "otpUi.queryParameters.optimizeFor"
      }),
      options: queryParams => getBikeTripOptions(intl, queryParams)
    },
    maxWalkTime: {
      label: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.queryParameters.maxWalkTime"],
        description: "Max walk time label",
        id: "otpUi.queryParameters.maxWalkTime"
      }),
      options: getDurationOptions(intl, [5, 10, 15, 20, 30, 45, 60])
    },
    walkSpeed: {
      label: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.queryParameters.walkSpeed"],
        description: "Max walk speed label",
        id: "otpUi.queryParameters.walkSpeed"
      }),
      options: getSpeedOptionsInMilesPerHour(intl, [2, 3, 4])
    },
    maxBikeTime: {
      label: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.queryParameters.maxBikeTime"],
        description: "Max bike time label",
        id: "otpUi.queryParameters.maxBikeTime"
      }),
      options: getDurationOptions(intl, [5, 10, 15, 20, 30, 45, 60])
    },
    bikeSpeed: {
      label: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.queryParameters.bikeSpeed"],
        description: "Bike speed selector label",
        id: "otpUi.queryParameters.bikeSpeed"
      }),
      options: getSpeedOptionsInMilesPerHour(intl, [6, 8, 10, 12])
    },
    maxEScooterDistance: {
      label: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.queryParameters.maxEScooterDistance"],
        description: "Max e-scooter distance label",
        id: "otpUi.queryParameters.maxEScooterDistance"
      }),
      options: getDistanceOptionsInMiles(intl, [0.25, 0.5, 0.75, 1, 2, 3, 5, 10, 20, 30])
    },
    watts: {
      label: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.queryParameters.watts"],
        description: "E-scooter power label",
        id: "otpUi.queryParameters.watts"
      }),
      options: [{
        text: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.queryParameters.watts125kidsHoverboard"],
          description: "Label for a kid's e-scooter",
          id: "otpUi.queryParameters.watts125kidsHoverboard"
        }),
        value: 125
      }, {
        text: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.queryParameters.watts250entryLevelEscooter"],
          description: "Label for an entry-level e-scooter",
          id: "otpUi.queryParameters.watts250entryLevelEscooter"
        }),
        value: 250
      }, {
        text: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.queryParameters.watts500robustEscooter"],
          description: "Label for a robust e-scooter",
          id: "otpUi.queryParameters.watts500robustEscooter"
        }),
        value: 500
      }, {
        text: intl.formatMessage({
          defaultMessage: defaultMessages["otpUi.queryParameters.watts1500powerfulEscooter"],
          description: "Label for a powerful e-scooter",
          id: "otpUi.queryParameters.watts1500powerfulEscooter"
        }),
        value: 1500
      }]
    },
    wheelchair: {
      label: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.queryParameters.wheelchair"],
        description: "Label for wheelchair option",
        id: "otpUi.queryParameters.wheelchair"
      })
    }
  };
}
//# sourceMappingURL=query-params-i18n.js.map