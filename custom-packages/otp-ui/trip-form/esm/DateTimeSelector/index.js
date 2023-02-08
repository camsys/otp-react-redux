import _defineProperty from "@babel/runtime/helpers/defineProperty";
import flatten from "flat";
import moment from "moment"; // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for core-utils packages.

import coreUtils from "@opentripplanner/core-utils";
import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import ModeButton from "../ModeButton";
import * as S from "../styled"; // eslint-disable-next-line prettier/prettier

// Load the default messages.
import defaultEnglishMessages from "../../i18n/en-US.yml"; // HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.

var defaultMessages = flatten(defaultEnglishMessages);
var _coreUtils$time = coreUtils.time,
    OTP_API_DATE_FORMAT = _coreUtils$time.OTP_API_DATE_FORMAT,
    OTP_API_TIME_FORMAT = _coreUtils$time.OTP_API_TIME_FORMAT;

/**
 * Determines whether the browser supports a particular <input type=<type> /> control,
 * so we can take advantage of native controls
 * (especially date/time selection) on modern (mobile) browsers.
 * @param {*} type One of the HTML5 input types.
 */
function isInputTypeSupported(type) {
  var input = document.createElement("input");
  input.setAttribute("type", type);
  return input.type === type;
}

var supportsDateTimeInputs = isInputTypeSupported("date") && isInputTypeSupported("time");
/**
 * The `DateTimeSelector` component lets the OTP user chose a departure or arrival date/time.
 * (The departure can be right now.)
 *
 * There are two rendering modes, a "normal" mode and a "legacy" mode.
 * - "Normal" mode: We try to use `<input type="time|date">` for date and time input.
 *   On current HTML5 browsers (desktop or mobile), these controls
 *   render the date/time according to OS settings and natively offer a user interface
 *   for choosing the date/time.
 *   Thus, when `<input type="time|date">` is supported, there is no need to specify a date/time format.
 *   If not, we fall back to "legacy" mode.
 * - "Legacy" mode: On Safari for MacOS, and on legacy browsers that don't support `<input type="time|date">`,
 *   `<input type="time|date">` renders as the default `<input type="text">`, and in these conditions,
 *   we have to fall back to formatting the date/time ourselves, using `dateFormatLegacy` and `timeFormatLegacy` props.
 * - Implementers don't know in advance whether the browser supports `<input type="time|date">`.
 *   That determination is performed by method `isInputTypeSupported(type)` above when the constructor is executed.
 *   Therefore, they should provide `dateFormatLegacy` and `timeFormatLegacy` props as a backup.
 *   If these props are not provided, the OTP API date format is used.
 * - For testing purposes, implementers can "force" the "legacy" mode by setting the `forceLegacy` prop to true.
 */

export default function DateTimeSelector(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className,
      _ref$date = _ref.date,
      date = _ref$date === void 0 ? null : _ref$date,
      _ref$dateFormatLegacy = _ref.dateFormatLegacy,
      dateFormatLegacy = _ref$dateFormatLegacy === void 0 ? OTP_API_DATE_FORMAT : _ref$dateFormatLegacy,
      _ref$departArrive = _ref.departArrive,
      departArrive = _ref$departArrive === void 0 ? "NOW" : _ref$departArrive,
      _ref$forceLegacy = _ref.forceLegacy,
      forceLegacy = _ref$forceLegacy === void 0 ? false : _ref$forceLegacy,
      _ref$onQueryParamChan = _ref.onQueryParamChange,
      onQueryParamChange = _ref$onQueryParamChan === void 0 ? null : _ref$onQueryParamChan,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? null : _ref$style,
      _ref$time = _ref.time,
      time = _ref$time === void 0 ? null : _ref$time,
      _ref$timeFormatLegacy = _ref.timeFormatLegacy,
      timeFormatLegacy = _ref$timeFormatLegacy === void 0 ? OTP_API_TIME_FORMAT : _ref$timeFormatLegacy;
  var handleQueryParamChange = useCallback(function (queryParam) {
    if (typeof onQueryParamChange === "function") {
      onQueryParamChange(queryParam);
    }
  }, [onQueryParamChange]);

  var handleInputChange = function handleInputChange(key) {
    return useCallback(function (evt) {
      handleQueryParamChange(_defineProperty({}, key, evt.target.value));
    }, [onQueryParamChange, key]);
  };

  var handleDateChange = handleInputChange("date");
  var handleTimeChange = handleInputChange("time");
  var handleTimeChangeLegacy = useCallback(function (evt) {
    var newTime = moment(evt.target.value, timeFormatLegacy).format(OTP_API_TIME_FORMAT);
    handleQueryParamChange({
      newTime: newTime
    });
  }, [onQueryParamChange]);
  var handleDateChangeLegacy = useCallback(function (evt) {
    var newDate = moment(evt.target.value, dateFormatLegacy).format(OTP_API_DATE_FORMAT);
    handleQueryParamChange({
      newDate: newDate
    });
  }, [onQueryParamChange]);

  var setDepartArrive = function setDepartArrive(option) {
    return useCallback(function () {
      if (option.type === "NOW") {
        handleQueryParamChange({
          departArrive: "NOW",
          date: moment().format(OTP_API_DATE_FORMAT),
          time: moment().format(OTP_API_TIME_FORMAT)
        });
      } else {
        handleQueryParamChange({
          departArrive: option.type
        });
      }
    }, [onQueryParamChange, option.type]);
  };

  var departureOptions = [{
    // Default option.
    type: "NOW",
    text: /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.DateTimeSelector.now"],
      description: "Text indicating that the traveler wants to depart as soon as possible (i.e. 'now')",
      id: "otpUi.DateTimeSelector.now"
    })
  }, {
    type: "DEPART",
    text: /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.DateTimeSelector.depart"],
      description: "Text indicating that the traveler wants to depart at a given date/time",
      id: "otpUi.DateTimeSelector.depart"
    })
  }, {
    type: "ARRIVE",
    text: /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.DateTimeSelector.arrive"],
      description: "Text indicating that the traveler wants to arrive by a certain date/time",
      id: "otpUi.DateTimeSelector.arrive"
    })
  }];
  departureOptions.forEach(function (opt) {
    opt.isSelected = departArrive === opt.type;
  });
  var isLegacy = forceLegacy || !supportsDateTimeInputs;
  return /*#__PURE__*/React.createElement(S.DateTimeSelector, {
    className: className,
    style: style
  }, /*#__PURE__*/React.createElement(S.DateTimeSelector.DepartureRow, null, departureOptions.map(function (opt) {
    return /*#__PURE__*/React.createElement(ModeButton, {
      key: opt.type,
      onClick: setDepartArrive(opt),
      selected: opt.isSelected
    }, opt.text);
  })), departArrive !== "NOW" && !isLegacy && /*#__PURE__*/React.createElement(S.DateTimeSelector.DateTimeRow, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    onChange: handleTimeChange,
    required: true,
    type: "time",
    value: time
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    onChange: handleDateChange,
    required: true,
    type: "date",
    value: date
  }))), departArrive !== "NOW" && isLegacy && /*#__PURE__*/React.createElement(S.DateTimeSelector.DateTimeRow, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    defaultValue: moment(time, OTP_API_TIME_FORMAT).format(timeFormatLegacy),
    onChange: handleTimeChangeLegacy,
    required: true,
    type: "text"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    defaultValue: moment(date, OTP_API_DATE_FORMAT).format(dateFormatLegacy),
    onChange: handleDateChangeLegacy,
    required: true,
    type: "text"
  }))));
}
//# sourceMappingURL=index.js.map