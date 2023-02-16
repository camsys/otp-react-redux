"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeFormat = getTimeFormat;
exports.getDateFormat = getDateFormat;
exports.getLongDateFormat = getLongDateFormat;
exports.formatDuration = formatDuration;
exports.formatDurationWithSeconds = formatDurationWithSeconds;
exports.formatTime = formatTime;
exports.formatSecondsAfterMidnight = formatSecondsAfterMidnight;
exports.getUserTimezone = getUserTimezone;
exports.getCurrentTime = getCurrentTime;
exports.getCurrentDate = getCurrentDate;
exports.OTP_API_TIME_FORMAT = exports.OTP_API_DATE_FORMAT_DATE_FNS = exports.OTP_API_DATE_FORMAT = void 0;

var _dateFns = require("date-fns");

var _dateFnsTz = require("date-fns-tz");

// special constants for making sure the following date format is always sent to
// OTP regardless of whatever the user has configured as the display format
const OTP_API_DATE_FORMAT = "YYYY-MM-DD"; // Date-Fns uses a different string format than moment.js
// see https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md

exports.OTP_API_DATE_FORMAT = OTP_API_DATE_FORMAT;
const OTP_API_DATE_FORMAT_DATE_FNS = "yyyy-MM-dd";
exports.OTP_API_DATE_FORMAT_DATE_FNS = OTP_API_DATE_FORMAT_DATE_FNS;
const OTP_API_TIME_FORMAT = "HH:mm";
/**
 * To ease the transition away from moment.js, this method uses date-fns to format durations
 * the way moment.js did.
 * @param {number}  seconds     The number of seconds to format
 * @param {boolean} showSeconds Whether to render seconds or not
 * @param {boolean} localize    If true, will create output like moment.js using date-fns locale.
 * Otherwise, uses date-fns default
 * @returns                   Formatted duration
 */

exports.OTP_API_TIME_FORMAT = OTP_API_TIME_FORMAT;

function formatDurationLikeMoment(seconds, showSeconds, localize = true) {
  // date-fns doesn't do this automatically
  if (!showSeconds && seconds < 60 || seconds === 0) {
    return "0 min";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secondsLeftOver = showSeconds ? seconds - hours * 3600 - minutes * 60 : 0;
  const specLookup = {
    xHours: "hr",
    xMinutes: "min",
    xSeconds: "sec"
  };
  const locale = localize ? {
    code: "en-US",
    formatDistance: (spec, val) => {
      return `${val} ${specLookup[spec]}`;
    }
  } : undefined;
  return (0, _dateFns.formatDuration)({
    hours,
    minutes,
    seconds: secondsLeftOver
  }, {
    format: ["hours", "minutes", "seconds"],
    locale
  });
}
/**
 * @param  {[type]} config the OTP config object found in store
 * @return {string}        the config-defined time formatter or HH:mm (24-hr time)
 */


function getTimeFormat(config) {
  var _config$dateTime;

  return (config === null || config === void 0 ? void 0 : (_config$dateTime = config.dateTime) === null || _config$dateTime === void 0 ? void 0 : _config$dateTime.timeFormat) || OTP_API_TIME_FORMAT;
}

function getDateFormat(config) {
  var _config$dateTime2;

  return (config === null || config === void 0 ? void 0 : (_config$dateTime2 = config.dateTime) === null || _config$dateTime2 === void 0 ? void 0 : _config$dateTime2.dateFormat) || OTP_API_DATE_FORMAT;
}

function getLongDateFormat(config) {
  var _config$dateTime3;

  return (config === null || config === void 0 ? void 0 : (_config$dateTime3 = config.dateTime) === null || _config$dateTime3 === void 0 ? void 0 : _config$dateTime3.longDateFormat) || "D MMMM YYYY";
}
/**
 * Formats an elapsed time duration for display in narrative.
 * TODO: internationalization
 * @param {number} seconds duration in seconds
 * @returns {string} formatted text representation
 */


function formatDuration(seconds) {
  return formatDurationLikeMoment(seconds, false);
}
/**
 * Formats an elapsed time in seconds, minutes, hours duration for display in narrative
 * TODO: internationalization
 * @param {number} seconds duration in seconds
 * @returns {string} formatted text representation
 */


function formatDurationWithSeconds(seconds) {
  return formatDurationLikeMoment(seconds, true);
}
/**
 * Formats a time value for display in narrative
 * TODO: internationalization/timezone
 * @param {number} ms epoch time value in milliseconds
 * @returns {string} formatted text representation
 */


function formatTime(ms, options) {
  return (0, _dateFns.format)(ms + ((options === null || options === void 0 ? void 0 : options.offset) || 0), (options === null || options === void 0 ? void 0 : options.format) || OTP_API_TIME_FORMAT);
}
/**
 * Formats a seconds after midnight value for display in narrative
 * @param  {number} seconds  time since midnight in seconds
 * @param  {string} timeFormat  A valid date-fns time format
 * @return {string}                   formatted text representation
 */


function formatSecondsAfterMidnight(seconds, timeFormat) {
  const time = (0, _dateFns.add)((0, _dateFns.startOfDay)(new Date()), {
    seconds
  });
  return (0, _dateFns.format)(time, timeFormat);
}
/**
 * Uses Intl.DateTimeFormat() api to get the user's time zone. In a test
 * environment, pulls timezone information from an env variable. Default to
 * GMT+0 if the Intl API is unavailable.
 */


function getUserTimezone(fallbackTimezone = "Etc/Greenwich") {
  var _Intl;

  if (process.env.NODE_ENV === "test") return process.env.TZ;
  return ((_Intl = Intl) === null || _Intl === void 0 ? void 0 : _Intl.DateTimeFormat().resolvedOptions().timeZone) || fallbackTimezone;
}
/**
 * Formats current time for use in OTP query
 * The conversion to the user's timezone is needed for testing purposes.
 */


function getCurrentTime(timezone = getUserTimezone()) {
  return (0, _dateFns.format)((0, _dateFnsTz.utcToZonedTime)(Date.now(), timezone), OTP_API_TIME_FORMAT);
}
/**
 * Formats current date for use in OTP query
 * The conversion to the user's timezone is needed for testing purposes.
 */


function getCurrentDate(timezone = getUserTimezone()) {
  return (0, _dateFns.format)((0, _dateFnsTz.utcToZonedTime)(Date.now(), timezone), OTP_API_DATE_FORMAT_DATE_FNS);
}
//# sourceMappingURL=time.js.map