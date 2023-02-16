"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireWildcard(require("react"));

var _util = require("./util");

var S = _interopRequireWildcard(require("./styled"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore FIXME: Create TypeScript types for core-utils packages.
const ModeRow = ({
  checkboxIcons,
  onQueryParamChange,
  queryParamOverrides,
  queryParams,
  SimpleModeIcon,
  supportedModes
}) => {
  const {
    categories
  } = supportedModes;
  const selectedModes = (0, _util.getSelectedModes)(queryParams);
  const selectedTransit = selectedModes.filter(_coreUtils.default.itinerary.isTransit);
  const hasTransit = selectedTransit.length > 0;
  const selectedTransitString = selectedTransit.join(",") || "TRANSIT";

  const setModeToTransit = () => onQueryParamChange({
    companies: "",
    mode: `${selectedTransitString},WALK`
  }); // Scroll to active mode on initial render
  // This ref is attached to every active mode checkbox


  const initialRenderRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    // Non-DOM environments don't support scrollIntoView
    // Also disable for modes that have transit to prevent confusing
    // and unnecessary scrolling
    if (!_util.isServerEnv && !hasTransit) {
      var _initialRenderRef$cur;

      initialRenderRef === null || initialRenderRef === void 0 ? void 0 : (_initialRenderRef$cur = initialRenderRef.current) === null || _initialRenderRef$cur === void 0 ? void 0 : _initialRenderRef$cur.scrollIntoView({
        behavior: "auto",
        // Ideally there is no vertical scrolling, but if this likely non-effective
        // scrolling is acceptable, then it is simpler
        block: "end",
        inline: "center"
      });
    }
  }, []);
  return (
    /*#__PURE__*/

    /* Not hiding the scrollbars here ensures the user can still scroll. Scrollbars are hidden using CSS. */
    _react.default.createElement(S.ScrollableRow, {
      hideScrollbars: false
    }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      ariaLabel: "Go by Transit",
      checkboxIcons: checkboxIcons,
      checked: hasTransit // Prettier conflicts with jsx style rules
      // eslint-disable-next-line prettier/prettier
      ,
      onClick: setModeToTransit,
      selected: hasTransit,
      SimpleModeIcon: SimpleModeIcon
    }, "Go by Transit"), categories.map(category => {
      const selectedModeAndCategoryActive = (0, _util.categoryIsActive)(category, selectedModes);
      const isChecked = hasTransit ? category.type === "access" && selectedModeAndCategoryActive : category.type === "exclusive" && selectedModeAndCategoryActive;

      const onChangeMode = () => {
        var _category$options;

        // If clicking on a mode that's active, reset to transit only
        if (isChecked) {
          setModeToTransit();
          return;
        } // Use override query if present


        if (queryParamOverrides && queryParamOverrides[category.id]) {
          var _override$mode2;

          const override = queryParamOverrides[category.id]; // Ensure exclusive modes that share IDs with non-exclusive modes don't have transit

          if (category.type === "exclusive") {
            var _override$mode;

            override.mode = (_override$mode = override.mode) === null || _override$mode === void 0 ? void 0 : _override$mode.replace("TRANSIT,", "");
          } // Ensure access modes that share IDs with exclusive modes include transit


          if (category.type !== "exclusive" && !((_override$mode2 = override.mode) !== null && _override$mode2 !== void 0 && _override$mode2.includes("TRANSIT"))) {
            override.mode = `TRANSIT,${override.mode}`;
          }

          onQueryParamChange(override, category.id);
          return;
        }

        let mode = (0, _util.getCategoryPrimaryMode)(category);
        const companies = typeof category.mode === "undefined" ? "" : ((_category$options = category.options) === null || _category$options === void 0 ? void 0 : _category$options.map(o => o.company).join(",")) || "";

        if (category.type === "access") {
          mode = isChecked ? selectedTransitString : `${selectedTransitString},${mode}`;
        }

        onQueryParamChange({
          companies,
          mode
        }, category.id);
      }; // All Tri-Met categories either have a mode or the first option does


      const mode = category.mode || category.options && category.options[0].mode;
      return /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
        ariaLabel: category.label,
        checkboxIcons: checkboxIcons,
        checked: isChecked,
        key: `access-${category.label}`,
        mode: mode,
        onClick: onChangeMode,
        innerRef: isChecked ? initialRenderRef : null,
        selected: isChecked,
        SimpleModeIcon: SimpleModeIcon
      }, category.label);
    }))
  );
};

var _default = ModeRow;
exports.default = _default;
//# sourceMappingURL=ModeRow.js.map