"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TripOptions;
exports.Styled = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireWildcard(require("react"));

var _GeneralSettingsPanel = _interopRequireDefault(require("../GeneralSettingsPanel"));

var _FeaturedOption = _interopRequireDefault(require("./FeaturedOption"));

var _FeaturedOptionOverlay = _interopRequireDefault(require("./FeaturedOptionOverlay"));

var _util = require("./util");

var _ModeRow = _interopRequireDefault(require("./ModeRow"));

var _TransitOptions = _interopRequireDefault(require("./TransitOptions"));

var S = _interopRequireWildcard(require("./styled"));

exports.Styled = S;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for core-utils packages.

/**
 * This component renders the custom TriMet Mode Selector
 */
function TripOptions(props) {
  const {
    checkboxIcons,
    className,
    CompanyIcon,
    DetailedModeIcon,
    featuredItemOverlayBackButton,
    featuredItemOverlayEnabled,
    featuredItemOverlayShown,
    footer,
    onQueryParamChange: updateQueryParams,
    queryParams,
    QuestionIcon,
    SimpleModeIcon,
    supportedCompanies,
    supportedModes,
    tripOptionIconFillOverride
  } = props;
  const [featuredOption, setFeaturedOption] = (0, _react.useState)(null);
  const [queryParamOverrides, setQueryParamOverrides] = (0, _react.useState)({}); // Populate the transit query param override if initial query params
  // include transit modes

  (0, _react.useEffect)(() => {
    const initialTransitModes = (0, _util.getSelectedModes)(queryParams).filter(_coreUtils.default.itinerary.isTransit);

    if (initialTransitModes.length > 0) {
      setQueryParamOverrides({
        transit: {
          mode: initialTransitModes.join(",")
        }
      });
    }
  }, []); // Allow external closing

  (0, _react.useEffect)(() => {
    if (featuredItemOverlayEnabled === false) {
      setFeaturedOption(null);
    }
  }, [featuredItemOverlayEnabled]); // Update callback when featuredItemOverlay changes

  (0, _react.useEffect)(() => {
    featuredItemOverlayShown && featuredItemOverlayShown(!!featuredOption);
  }, [featuredOption]); // FIXME: move all query param handling to hook (object with category to queryParam mapping)
  // THis will involve refactoring all sub-components to send category along with
  // query param update. The refactor will be complex but the end result will be
  // cleaner and simpler. Only this index component will handle queryParam generation,
  // all others could work in only React space.

  const onQueryParamChange = (newQueryParams, categoryId = null) => {
    const newParams = { ...newQueryParams
    }; // Update transit override if changes are made to transit submodes

    const updatedSelectedModes = (0, _util.getSelectedModes)(newParams);
    const updatedSelectedTransit = updatedSelectedModes.filter(_coreUtils.default.itinerary.isTransit); // Only update if the updated transit isn't "TRANSIT", since that would reset things
    // when the user doesn't want them to be reset.

    if (updatedSelectedTransit.length > 0 && updatedSelectedTransit[0] !== "TRANSIT") {
      setQueryParamOverrides({ ...queryParamOverrides,
        transit: {
          mode: updatedSelectedTransit.join(",")
        }
      });
    } // Update category override


    if (categoryId) {
      // If custom transit is set, un-set it here (it will be replaced later)
      if ("transit" in queryParamOverrides) {
        newQueryParams.mode = newQueryParams.mode.replace(queryParamOverrides.transit.mode, "TRANSIT");
      }

      const {
        companies,
        mode
      } = newQueryParams;
      setQueryParamOverrides({ ...queryParamOverrides,
        [categoryId]: {
          companies,
          mode
        }
      });
    } // Override transit if transit override is present


    if (updatedSelectedTransit[0] === "TRANSIT" && "transit" in queryParamOverrides) {
      newParams.mode = newParams.mode.replace("TRANSIT", queryParamOverrides.transit.mode);
    }

    updateQueryParams(newParams);
  };

  if (featuredOption) {
    return /*#__PURE__*/_react.default.createElement(S.TripOptionsContainer, {
      className: className
    }, /*#__PURE__*/_react.default.createElement(_FeaturedOptionOverlay.default, {
      CompanyIcon: CompanyIcon,
      DetailedModeIcon: DetailedModeIcon,
      featuredOption: featuredOption,
      setFeaturedOption: setFeaturedOption,
      showBackButton: featuredItemOverlayBackButton,
      supportedCompanies: supportedCompanies,
      supportedModes: supportedModes
    }));
  }

  return /*#__PURE__*/_react.default.createElement(S.TripOptionsContainer, {
    className: className
  }, /*#__PURE__*/_react.default.createElement(_ModeRow.default, {
    checkboxIcons: checkboxIcons,
    onQueryParamChange: onQueryParamChange,
    queryParamOverrides: queryParamOverrides,
    queryParams: queryParams,
    SimpleModeIcon: SimpleModeIcon,
    supportedModes: supportedModes
  }), /*#__PURE__*/_react.default.createElement(S.TripOptionsSubContainer, null, /*#__PURE__*/_react.default.createElement(_FeaturedOption.default, {
    checkboxIcons: checkboxIcons,
    DetailedModeIcon: DetailedModeIcon,
    iconFillOverride: tripOptionIconFillOverride,
    onQueryParamChange: onQueryParamChange,
    queryParams: queryParams,
    questionIcon: QuestionIcon,
    setFeaturedOption: setFeaturedOption,
    supportedModes: supportedModes
  }), /*#__PURE__*/_react.default.createElement(_GeneralSettingsPanel.default, {
    onQueryParamChange: onQueryParamChange,
    query: queryParams,
    supportedModes: supportedModes
  }), /*#__PURE__*/_react.default.createElement(_TransitOptions.default, {
    checkboxIcons: checkboxIcons,
    DetailedModeIcon: DetailedModeIcon,
    onQueryParamChange: onQueryParamChange,
    queryParams: queryParams,
    supportedModes: supportedModes
  }), footer));
}
//# sourceMappingURL=index.js.map