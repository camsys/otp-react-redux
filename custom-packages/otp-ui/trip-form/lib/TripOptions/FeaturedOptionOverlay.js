"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ExternalLinkAlt = require("@styled-icons/fa-solid/ExternalLinkAlt");

var _react = _interopRequireDefault(require("react"));

var S = _interopRequireWildcard(require("./styled"));

var _util = require("./util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const FeaturedOptionOverlay = ({
  featuredOption,
  setFeaturedOption,
  showBackButton,
  supportedModes,
  CompanyIcon,
  DetailedModeIcon
}) => {
  // Find the mode that matches the selected category
  const category = supportedModes.categories.find(c => // Each supported mode may have "sub-modes". We need to identify the correct one to match the category correctly
  featuredOption === (0, _util.getCategoryModes)(c).find(mode => featuredOption === mode));

  const defaultImageRender = o => o.image ? /*#__PURE__*/_react.default.createElement("img", {
    src: o.image,
    alt: o.label
  }) : o.label;

  return /*#__PURE__*/_react.default.createElement(S.OverlayContainer, null, showBackButton && /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setFeaturedOption(null),
    type: "button"
  }, "Back"), /*#__PURE__*/_react.default.createElement(S.FeaturedOptionImageWrapper, null, DetailedModeIcon && /*#__PURE__*/_react.default.createElement(DetailedModeIcon, {
    mode: (0, _util.getCategoryPrimaryMode)(category)
  }) || /*#__PURE__*/_react.default.createElement(S.MaxHeightImage, {
    src: category.image
  })), /*#__PURE__*/_react.default.createElement(S.OverlayHeader, null, category.label), /*#__PURE__*/_react.default.createElement("p", null, category.description), /*#__PURE__*/_react.default.createElement(S.OverlayOptions, null, category.options.map(o => {
    // Don't show non-company options (e.g., park and ride)
    if (!o.company) return null;
    return /*#__PURE__*/_react.default.createElement("li", {
      key: o.label
    }, /*#__PURE__*/_react.default.createElement("a", {
      href: o.url
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "label"
    }, CompanyIcon && /*#__PURE__*/_react.default.createElement(CompanyIcon, {
      company: o.company
    }) || defaultImageRender(o)), /*#__PURE__*/_react.default.createElement("span", {
      className: "open-link"
    }, "Open app", /*#__PURE__*/_react.default.createElement(_ExternalLinkAlt.ExternalLinkAlt, {
      style: {
        height: "1em",
        width: "1em",
        marginLeft: "1ch"
      }
    }))));
  })));
};

var _default = FeaturedOptionOverlay;
exports.default = _default;
//# sourceMappingURL=FeaturedOptionOverlay.js.map