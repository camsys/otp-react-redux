"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DateTimeSelector;

var _flat = _interopRequireDefault(require("flat"));

var _moment = _interopRequireDefault(require("moment"));

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _ModeButton = _interopRequireDefault(require("../ModeButton"));

var S = _interopRequireWildcard(require("../styled"));

var _enUS = _interopRequireDefault(require("../../i18n/en-US.yml"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for core-utils packages.
// Load the default messages.
// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
const defaultMessages = (0, _flat.default)(_enUS.default);
const {
  OTP_API_DATE_FORMAT,
  OTP_API_TIME_FORMAT
} = _coreUtils.default.time;

/**
 * Determines whether the browser supports a particular <input type=<type> /> control,
 * so we can take advantage of native controls
 * (especially date/time selection) on modern (mobile) browsers.
 * @param {*} type One of the HTML5 input types.
 */
function isInputTypeSupported(type) {
  const input = document.createElement("input");
  input.setAttribute("type", type);
  return input.type === type;
}

const supportsDateTimeInputs = isInputTypeSupported("date") && isInputTypeSupported("time");
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

function DateTimeSelector({
  className = null,
  date = null,
  dateFormatLegacy = OTP_API_DATE_FORMAT,
  departArrive = "NOW",
  forceLegacy = false,
  onQueryParamChange = null,
  style = null,
  time = null,
  timeFormatLegacy = OTP_API_TIME_FORMAT
}) {
  const handleQueryParamChange = (0, _react.useCallback)(queryParam => {
    if (typeof onQueryParamChange === "function") {
      onQueryParamChange(queryParam);
    }
  }, [onQueryParamChange]);

  const handleInputChange = key => (0, _react.useCallback)(evt => {
    handleQueryParamChange({
      [key]: evt.target.value
    });
  }, [onQueryParamChange, key]);

  const handleDateChange = handleInputChange("date");
  const handleTimeChange = handleInputChange("time");
  const handleTimeChangeLegacy = (0, _react.useCallback)(evt => {
    const newTime = (0, _moment.default)(evt.target.value, timeFormatLegacy).format(OTP_API_TIME_FORMAT);
    handleQueryParamChange({
      newTime
    });
  }, [onQueryParamChange]);
  const handleDateChangeLegacy = (0, _react.useCallback)(evt => {
    const newDate = (0, _moment.default)(evt.target.value, dateFormatLegacy).format(OTP_API_DATE_FORMAT);
    handleQueryParamChange({
      newDate
    });
  }, [onQueryParamChange]);

  const setDepartArrive = option => (0, _react.useCallback)(() => {
    if (option.type === "NOW") {
      handleQueryParamChange({
        departArrive: "NOW",
        date: (0, _moment.default)().format(OTP_API_DATE_FORMAT),
        time: (0, _moment.default)().format(OTP_API_TIME_FORMAT)
      });
    } else {
      handleQueryParamChange({
        departArrive: option.type
      });
    }
  }, [onQueryParamChange, option.type]);

  const departureOptions = [{
    // Default option.
    type: "NOW",
    text: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.DateTimeSelector.now"],
      description: "Text indicating that the traveler wants to depart as soon as possible (i.e. 'now')",
      id: "otpUi.DateTimeSelector.now"
    })
  }, {
    type: "DEPART",
    text: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.DateTimeSelector.depart"],
      description: "Text indicating that the traveler wants to depart at a given date/time",
      id: "otpUi.DateTimeSelector.depart"
    })
  }, {
    type: "ARRIVE",
    text: /*#__PURE__*/_react.default.createElement(_reactIntl.FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.DateTimeSelector.arrive"],
      description: "Text indicating that the traveler wants to arrive by a certain date/time",
      id: "otpUi.DateTimeSelector.arrive"
    })
  }];
  departureOptions.forEach(opt => {
    opt.isSelected = departArrive === opt.type;
  });
  const isLegacy = forceLegacy || !supportsDateTimeInputs;
  return /*#__PURE__*/_react.default.createElement(S.DateTimeSelector, {
    className: className,
    style: style
  }, /*#__PURE__*/_react.default.createElement(S.DateTimeSelector.DepartureRow, null, departureOptions.map(opt => /*#__PURE__*/_react.default.createElement(_ModeButton.default, {
    key: opt.type,
    onClick: setDepartArrive(opt),
    selected: opt.isSelected
  }, opt.text))), departArrive !== "NOW" && !isLegacy && /*#__PURE__*/_react.default.createElement(S.DateTimeSelector.DateTimeRow, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
    onChange: handleTimeChange,
    required: true,
    type: "time",
    value: time
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
    onChange: handleDateChange,
    required: true,
    type: "date",
    value: date
  }))), departArrive !== "NOW" && isLegacy && /*#__PURE__*/_react.default.createElement(S.DateTimeSelector.DateTimeRow, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
    defaultValue: (0, _moment.default)(time, OTP_API_TIME_FORMAT).format(timeFormatLegacy),
    onChange: handleTimeChangeLegacy,
    required: true,
    type: "text"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
    defaultValue: (0, _moment.default)(date, OTP_API_DATE_FORMAT).format(dateFormatLegacy),
    onChange: handleDateChangeLegacy,
    required: true,
    type: "text"
  }))));
}
//# sourceMappingURL=index.js.map