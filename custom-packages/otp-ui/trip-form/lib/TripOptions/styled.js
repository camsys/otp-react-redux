"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollableRow = exports.OverlayOptions = exports.OverlayHeader = exports.OverlayContainer = exports.FeaturedOptionContainer = exports.Checkbox = exports.OptionImage = exports.OptionIcon = exports.OptionLabel = exports.OptionButton = exports.MaxHeightImage = exports.FeaturedOptionQuestionContainer = exports.QuestionButton = exports.ModeIconWrapper = exports.FeaturedOptionImageWrapper = exports.Image = exports.UncheckedIcon = exports.GreenCheck = exports.buttonIconCss = exports.TransitOptionsContainer = exports.TripOptionsSubContainer = exports.TripOptionsContainer = void 0;

var _reactIndianaDragScroll = _interopRequireDefault(require("react-indiana-drag-scroll"));

var _reactInlinesvg = _interopRequireDefault(require("react-inlinesvg"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Check = require("@styled-icons/bootstrap/Check");

var _PlusCircle = require("@styled-icons/boxicons-regular/PlusCircle");

var _util = require("./util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// todo: move this string to localization file (and possibly add more exact info on each particular mode)
const modeButtonAriaLabel = "Opens a dialog that describes this mode, with optional links to third party services.";

const TripOptionsContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__TripOptionsContainer",
  componentId: "sc-18bsv9u-0"
})(["background-color:#0d5eac;color:white;font-weight:40;max-width:992px;min-height:400px;"]);

exports.TripOptionsContainer = TripOptionsContainer;

const TripOptionsSubContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__TripOptionsSubContainer",
  componentId: "sc-18bsv9u-1"
})(["max-width:700px;padding:12px;"]);

exports.TripOptionsSubContainer = TripOptionsSubContainer;

const TransitOptionsContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitOptionsContainer",
  componentId: "sc-18bsv9u-2"
})(["display:flex;gap:20px;> button{flex:1;}"]);

exports.TransitOptionsContainer = TransitOptionsContainer;
const buttonIconCss = (0, _styledComponents.css)(["border-radius:50%;height:2.5em;margin-bottom:10px;width:2.5em;z-index:10;"]);
exports.buttonIconCss = buttonIconCss;
const GreenCheck = (0, _styledComponents.default)(_Check.Check).withConfig({
  displayName: "styled__GreenCheck",
  componentId: "sc-18bsv9u-3"
})(["", " background-color:rgb(84,174,88);color:white;"], buttonIconCss);
exports.GreenCheck = GreenCheck;
const UncheckedIcon = (0, _styledComponents.default)(_PlusCircle.PlusCircle).withConfig({
  displayName: "styled__UncheckedIcon",
  componentId: "sc-18bsv9u-4"
})(["", ""], buttonIconCss);
exports.UncheckedIcon = UncheckedIcon;

const Image = _styledComponents.default.img.withConfig({
  displayName: "styled__Image",
  componentId: "sc-18bsv9u-5"
})(["max-width:100%;"]);

exports.Image = Image;

const FeaturedOptionImageWrapper = _styledComponents.default.div.withConfig({
  displayName: "styled__FeaturedOptionImageWrapper",
  componentId: "sc-18bsv9u-6"
})(["align-items:center;display:flex;justify-content:center;padding:1em;*{max-height:200px;width:100%;}"]);

exports.FeaturedOptionImageWrapper = FeaturedOptionImageWrapper;

const ModeIconWrapper = _styledComponents.default.span.withConfig({
  displayName: "styled__ModeIconWrapper",
  componentId: "sc-18bsv9u-7"
})(["~ ", ",~ ", "{height:1.5em;margin-bottom:-1em;position:relative;right:-30px;top:-50px;width:1.5em;}& svg{fill:white;height:3em;position:relative;width:3em;}"],
/* sc-selector */
GreenCheck,
/* sc-selector */
UncheckedIcon);

exports.ModeIconWrapper = ModeIconWrapper;

const QuestionButton = _styledComponents.default.button.attrs({
  "aria-label": modeButtonAriaLabel
}).withConfig({
  displayName: "styled__QuestionButton",
  componentId: "sc-18bsv9u-8"
})(["background-color:rgba(0,0,0,0);border:none;color:white;cursor:pointer;float:right;opacity:0.5;> svg{height:1em;width:1em;}:hover{opacity:1;}"]);

exports.QuestionButton = QuestionButton;

const FeaturedOptionQuestionContainer = _styledComponents.default.div.attrs({
  "aria-label": modeButtonAriaLabel
}).withConfig({
  displayName: "styled__FeaturedOptionQuestionContainer",
  componentId: "sc-18bsv9u-9"
})(["cursor:pointer;&:hover ", "{opacity:1;}"], QuestionButton);

exports.FeaturedOptionQuestionContainer = FeaturedOptionQuestionContainer;
const MaxHeightImage = (0, _styledComponents.default)(Image).withConfig({
  displayName: "styled__MaxHeightImage",
  componentId: "sc-18bsv9u-10"
})(["max-height:200px;"]);
exports.MaxHeightImage = MaxHeightImage;

const OptionButton = _styledComponents.default.button.attrs(props => ({
  "aria-checked": props.ariaChecked || props.selected,
  "aria-label": props.ariaLabel,
  role: "checkbox",
  tabIndex: 0
})).withConfig({
  displayName: "styled__OptionButton",
  componentId: "sc-18bsv9u-11"
})(["align-items:center;background-color:rgba(0,0,0,0);border-color:", ";border-radius:7px;border:solid 1px;color:white;cursor:", ";display:flex;grid-gap:10px;justify-content:space-between;margin-top:7px;min-width:100%;opacity:", ";padding:7px 5px;svg{@media (max-width:768px){max-height:20px;max-width:20px;}}&:hover{opacity:1;}"], props => props.selected ? "white" : "lightgrey", props => props.disabled ? "not-allowed" : "pointer", props => props.selected ? "1" : "0.65");

exports.OptionButton = OptionButton;

const OptionLabel = _styledComponents.default.div.withConfig({
  displayName: "styled__OptionLabel",
  componentId: "sc-18bsv9u-12"
})(["flex:2;text-align:left;"]);

exports.OptionLabel = OptionLabel;

const OptionIcon = _styledComponents.default.div.withConfig({
  displayName: "styled__OptionIcon",
  componentId: "sc-18bsv9u-13"
})(["> svg{margin-bottom:0px;}"]);

exports.OptionIcon = OptionIcon;
const OptionImage = (0, _styledComponents.default)(_reactInlinesvg.default).withConfig({
  displayName: "styled__OptionImage",
  componentId: "sc-18bsv9u-14"
})(["max-height:20px;width:50px;", ""], props => props.iconFillOverride ? `fill: ${props.iconFillOverride};` : "");
exports.OptionImage = OptionImage;

const Checkbox = _styledComponents.default.button.attrs(props => ({
  "aria-checked": props.ariaChecked || props.selected,
  "aria-label": props.ariaLabel,
  role: "checkbox",
  tabIndex: 0
})).withConfig({
  displayName: "styled__Checkbox",
  componentId: "sc-18bsv9u-15"
})(["align-items:center;background-color:rgba(0,0,0,0);border:none;color:white;cursor:", ";display:flex;flex-direction:column;min-width:", ";opacity:", ";padding:20px 0px;white-space:pre-wrap;", ""], props => props.disabled ? "not-allowed" : "pointer", props => props.mode === "WALK" || props.mode === "BICYCLE" ? "50px" : "77px", props => props.selected ? "1" : "0.65", props => props.inset ? `
    margin: 20px 0;
    position: relative;

    ${UncheckedIcon} {
      background: #0d5eac;
    }

    ${GreenCheck}, ${UncheckedIcon} {
      position: absolute;
      right: 5.5%;
      top: 11%;
      @media (max-width: 768px) {
        max-height: 20px;
        max-width: 20px;
      }
    }
  ` : "");

exports.Checkbox = Checkbox;

const FeaturedOptionContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__FeaturedOptionContainer",
  componentId: "sc-18bsv9u-16"
})(["display:flex;min-height:200px;> div{flex:1;}"]);

exports.FeaturedOptionContainer = FeaturedOptionContainer;

const OverlayContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__OverlayContainer",
  componentId: "sc-18bsv9u-17"
})(["padding:15px;"]);

exports.OverlayContainer = OverlayContainer;

const OverlayHeader = _styledComponents.default.h3.withConfig({
  displayName: "styled__OverlayHeader",
  componentId: "sc-18bsv9u-18"
})(["text-align:center;"]);

exports.OverlayHeader = OverlayHeader;

const OverlayOptions = _styledComponents.default.ul.withConfig({
  displayName: "styled__OverlayOptions",
  componentId: "sc-18bsv9u-19"
})(["list-style:none;margin-left:0;padding-left:0;li > a{align-items:center;background-color:#fff;border-radius:7px;color:#000;display:flex;height:40px;justify-content:space-between;margin-bottom:10px;padding:10px;padding-bottom:5px;text-decoration:none;.label,.label *{height:40px;}.open-link{color:#777;}}"]); // The ScrollContainer doesn't work in the jsdom/server environment, so replace it with a div


exports.OverlayOptions = OverlayOptions;
const ScrollableRow = (0, _styledComponents.default)(_util.isServerEnv ? "div" : _reactIndianaDragScroll.default).withConfig({
  displayName: "styled__ScrollableRow",
  componentId: "sc-18bsv9u-20"
})(["background-color:#0a4c8d;display:flex;overflow-x:scroll;padding:0 12px;> button{display:flex;flex-direction:column;justify-content:space-between;margin-right:24px;}&:hover > button:hover{opacity:1;}&:hover > button:hover svg{opacity:1;}-ms-overflow-style:none;scrollbar-width:none;&::-webkit-scrollbar{display:none;}"]);
exports.ScrollableRow = ScrollableRow;
//# sourceMappingURL=styled.js.map