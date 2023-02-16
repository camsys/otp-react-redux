"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var S = _interopRequireWildcard(require("./styled"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _util = require("./util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for core-utils packages.
const TransitOptions = ({
  checkboxIcons,
  DetailedModeIcon,
  onQueryParamChange,
  queryParams,
  supportedModes
}) => {
  const {
    transitModes
  } = supportedModes;
  const selectedModes = (0, _util.getSelectedModes)(queryParams);
  const selectedTransit = selectedModes.filter(_coreUtils.default.itinerary.isTransit);
  const hasTransit = selectedTransit.length > 0;
  if (!hasTransit) return null;
  const selectedAndVisibleTransit = [];
  transitModes.forEach(m => {
    if (selectedTransit.some(t => t === m.mode) && !m.hidden) {
      selectedAndVisibleTransit.push(m);
    }
  });
  return /*#__PURE__*/_react.default.createElement(S.TransitOptionsContainer, null, transitModes.map(transitMode => {
    if (transitMode.hidden) return null;
    const allTransitEnabled = selectedModes.some(m => m === "TRANSIT");
    const isChecked = allTransitEnabled || selectedModes.some(m => m === transitMode.mode);
    return /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      ariaLabel: transitMode.label,
      checkboxIcons: checkboxIcons,
      checked: isChecked
      /* This prevents the user from de-selecting a transit mode when it is the only one selected.
      the selectedModes length being 3 indicates that only one mode is selected. GONDOLA, WALK, and the mode. */
      ,
      disabled: isChecked && selectedModes.length === 3,
      key: transitMode.mode,
      inset: true,
      onClick: () => {
        let mode = selectedModes; // Remove mode from list if all transit is selected.

        if (allTransitEnabled) {
          mode = selectedModes.filter(m => m !== "TRANSIT").concat(transitModes.filter(m => m.mode !== transitMode.mode).map(m => m.mode));
        } else if (isChecked) {
          // Handle unchecking.
          // If this is the last visible transit mode, switch to WALK only.
          mode = selectedAndVisibleTransit.length === 1 ? ["WALK"] : selectedModes.filter(m => m !== transitMode.mode);
        } else {
          // Add mode to list.
          mode = selectedModes.concat([transitMode.mode]);
        }

        onQueryParamChange({
          mode: mode.join(",")
        });
      },
      selected: isChecked
    }, DetailedModeIcon && /*#__PURE__*/_react.default.createElement(DetailedModeIcon, {
      mode: transitMode.mode
    }) || transitMode.image && /*#__PURE__*/_react.default.createElement(S.Image, {
      alt: `Image for ${transitMode.label}`,
      src: transitMode.image
    }), /*#__PURE__*/_react.default.createElement("span", {
      style: {
        zIndex: 5
      }
    }, transitMode.label));
  }));
};

var _default = TransitOptions;
exports.default = _default;
//# sourceMappingURL=TransitOptions.js.map