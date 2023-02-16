"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNonTransitModes = getNonTransitModes;
exports.accessModeIsWalkOnly = accessModeIsWalkOnly;
exports.getSelectedModes = getSelectedModes;
exports.getCategoryModes = getCategoryModes;
exports.getCategoryPrimaryMode = getCategoryPrimaryMode;
exports.isServerEnv = exports.categoryIsActive = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for core-utils packages.
function getNonTransitModes(modeString = "") {
  const modes = (modeString === null || modeString === void 0 ? void 0 : modeString.split(",")) || [];
  return modes.filter(m => !_coreUtils.default.itinerary.isTransit(m));
}

function accessModeIsWalkOnly(modeString = "") {
  const nonTransitModes = getNonTransitModes(modeString);
  return nonTransitModes.length === 0 || nonTransitModes.length === 1 && nonTransitModes[0] === "WALK";
}

function getSelectedModes(queryParams) {
  var _queryParams$mode;

  return (queryParams === null || queryParams === void 0 ? void 0 : (_queryParams$mode = queryParams.mode) === null || _queryParams$mode === void 0 ? void 0 : _queryParams$mode.split(",")) || [];
}

const categoryIsActive = (category, selectedModes) => {
  if (category.mode) {
    return selectedModes.some(m => m === category.mode);
  }

  if (category.options) {
    let isActive = false;
    category.options.forEach(o => {
      if (selectedModes.some(m => m === o.mode)) {
        isActive = true;
      }
    });
    return isActive;
  }

  return false;
};

exports.categoryIsActive = categoryIsActive;

function getCategoryModes(category) {
  return category.mode ? [category.mode] : category.options.map(o => o.mode);
}

function getCategoryPrimaryMode(category) {
  return getCategoryModes(category)[0];
}

const isServerEnv = typeof navigator !== "undefined" ? navigator.userAgent.includes("jsdom") : false;
exports.isServerEnv = isServerEnv;
//# sourceMappingURL=util.js.map