"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _QuestionCircle = require("@styled-icons/fa-regular/QuestionCircle");

var _util = require("./util");

var _OptionButton = _interopRequireDefault(require("./OptionButton"));

var S = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for core-utils packages.
// todo: move this string to localization file (and possibly add more exact info on each particular mode)
const modeButtonAriaLabel = "Opens a dialog that describes this mode, with optional links to third party services.";

const FeaturedOption = ({
  checkboxIcons,
  DetailedModeIcon,
  iconFillOverride,
  onQueryParamChange,
  queryParams,
  questionIcon,
  setFeaturedOption,
  supportedModes
}) => {
  var _queryParams$companie;

  // No featured mode to show if walking to transit
  if ((0, _util.accessModeIsWalkOnly)(queryParams === null || queryParams === void 0 ? void 0 : queryParams.mode)) return null;
  const nonTransitModes = (0, _util.getNonTransitModes)(queryParams === null || queryParams === void 0 ? void 0 : queryParams.mode);
  const selectedCompanies = (queryParams === null || queryParams === void 0 ? void 0 : (_queryParams$companie = queryParams.companies) === null || _queryParams$companie === void 0 ? void 0 : _queryParams$companie.split(",")) || [];
  const selectedModes = (0, _util.getSelectedModes)(queryParams);
  const option = nonTransitModes[0];
  const category = supportedModes.categories.find(c => (0, _util.getCategoryModes)(c).some(o => o === option));
  const optionsAreCheckboxes = Boolean(category.mode); // FIXME: the entire selectOption method could probably be repalced
  // with a better useEffect hook

  const selectOption = (isChecked, o) => {
    let mode = selectedModes;
    let company = selectedCompanies;

    if (isChecked) {
      // Un-check the company box if dealing with checkboxes. Otherwise, do nothing.
      if (optionsAreCheckboxes) {
        company = selectedCompanies.filter(c => c !== o.company); // Do nothing if already radio button is already checked.
      } else {
        return;
      }
    } else {
      // if un checked, set/add company and set mode (FIXME: what about car/walk)
      if (o.mode) {
        mode = selectedModes.filter(_coreUtils.default.itinerary.isTransit).concat([o.mode]);
      }

      if (o.company) {
        company = optionsAreCheckboxes ? selectedCompanies.concat([o.company]) : [o.company];
      } else {
        company = [];
      }
    }

    onQueryParamChange({
      companies: company.join(","),
      mode: mode.join(",")
    }, category.id);
  };

  return /*#__PURE__*/_react.default.createElement(S.FeaturedOptionContainer, null, /*#__PURE__*/_react.default.createElement("div", null, category.options.map((o, index) => {
    const companyIsSelected = selectedCompanies.some(c => c === o.company);
    const modeIsSelected = selectedModes.some(m => m === o.mode);
    const isChecked = optionsAreCheckboxes ? companyIsSelected : o.company ? companyIsSelected && modeIsSelected : modeIsSelected;
    return /*#__PURE__*/_react.default.createElement(_OptionButton.default, {
      checkboxIcons: checkboxIcons,
      checked: isChecked,
      disabled: isChecked && selectedCompanies.length === 1,
      iconFillOverride: iconFillOverride,
      image: o.image,
      key: index,
      label: o.label,
      onClick: () => selectOption(isChecked, o),
      selected: isChecked
    });
  })), /*#__PURE__*/_react.default.createElement(S.FeaturedOptionQuestionContainer, {
    "aria-label": modeButtonAriaLabel,
    onClick: () => setFeaturedOption(option),
    onKeyPress: () => setFeaturedOption(option),
    role: "link",
    tabIndex: 0
  }, /*#__PURE__*/_react.default.createElement(S.QuestionButton, {
    "aria-label": modeButtonAriaLabel
  }, questionIcon || /*#__PURE__*/_react.default.createElement(_QuestionCircle.QuestionCircle, null)), /*#__PURE__*/_react.default.createElement(S.FeaturedOptionImageWrapper, null, DetailedModeIcon && /*#__PURE__*/_react.default.createElement(DetailedModeIcon, {
    mode: (0, _util.getCategoryPrimaryMode)(category)
  }) || /*#__PURE__*/_react.default.createElement(S.Image, {
    src: category.image
  }))));
};

var _default = FeaturedOption;
exports.default = _default;
//# sourceMappingURL=FeaturedOption.js.map