"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsSelectorPanel = exports.GeneralSettingsPanel = exports.DropdownSelector = exports.ModeButton = exports.SubmodeSelector = exports.ModeSelector = exports.DateTimeSelector = exports.FloatingSettingLabel = exports.SettingLabel = exports.SettingsSection = exports.SettingsHeader = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

const SettingsHeader = _styledComponents.default.div.withConfig({
  displayName: "styled__SettingsHeader",
  componentId: "sc-122ziys-0"
})([""]);

exports.SettingsHeader = SettingsHeader;

const SettingsSection = _styledComponents.default.div.withConfig({
  displayName: "styled__SettingsSection",
  componentId: "sc-122ziys-1"
})([""]);

exports.SettingsSection = SettingsSection;

const SettingLabel = _styledComponents.default.label.withConfig({
  displayName: "styled__SettingLabel",
  componentId: "sc-122ziys-2"
})(["padding-left:6px;svg{width:22pt;}"]);

exports.SettingLabel = SettingLabel;
const FloatingSettingLabel = (0, _styledComponents.default)(SettingLabel).withConfig({
  displayName: "styled__FloatingSettingLabel",
  componentId: "sc-122ziys-3"
})(["float:left;"]);
exports.FloatingSettingLabel = FloatingSettingLabel;

const DateTimeSelector = _styledComponents.default.div.withConfig({
  displayName: "styled__DateTimeSelector",
  componentId: "sc-122ziys-4"
})([""]);

exports.DateTimeSelector = DateTimeSelector;
DateTimeSelector.DepartureRow = _styledComponents.default.div.withConfig({
  displayName: "styled__DepartureRow",
  componentId: "sc-122ziys-5"
})(["box-sizing:border-box;> *{box-sizing:border-box;width:33.333333%;padding:0px 5px;}"]);
DateTimeSelector.DateTimeRow = _styledComponents.default.div.withConfig({
  displayName: "styled__DateTimeRow",
  componentId: "sc-122ziys-6"
})(["box-sizing:border-box;> *{box-sizing:border-box;width:50%;padding:0px 5px;display:inline-block;}input{box-sizing:border-box;width:100%;}"]);

const ModeSelector = _styledComponents.default.div.withConfig({
  displayName: "styled__ModeSelector",
  componentId: "sc-122ziys-7"
})([""]);

exports.ModeSelector = ModeSelector;
ModeSelector.MainRow = _styledComponents.default.div.withConfig({
  displayName: "styled__MainRow",
  componentId: "sc-122ziys-8"
})(["padding:0px 5px;box-sizing:border-box;> *{width:100%;}"]);
ModeSelector.SecondaryRow = _styledComponents.default.div.withConfig({
  displayName: "styled__SecondaryRow",
  componentId: "sc-122ziys-9"
})(["> *{width:33.333333%;padding:0px 5px;}"]);
ModeSelector.TertiaryRow = _styledComponents.default.div.withConfig({
  displayName: "styled__TertiaryRow",
  componentId: "sc-122ziys-10"
})(["> *{width:33.333333%;padding:0px 5px;}"]);
const SubmodeSelector = (0, _styledComponents.default)(SettingsSection).withConfig({
  displayName: "styled__SubmodeSelector",
  componentId: "sc-122ziys-11"
})([""]);
exports.SubmodeSelector = SubmodeSelector;

const submodeRow = _styledComponents.default.div.withConfig({
  displayName: "styled__submodeRow",
  componentId: "sc-122ziys-12"
})([""]);

SubmodeSelector.Row = submodeRow;
SubmodeSelector.InlineRow = (0, _styledComponents.default)(submodeRow).withConfig({
  displayName: "styled__InlineRow",
  componentId: "sc-122ziys-13"
})(["text-align:right;"]);

const ModeButton = _styledComponents.default.div.withConfig({
  displayName: "styled__ModeButton",
  componentId: "sc-122ziys-14"
})(["display:inline-block;text-align:center;box-sizing:border-box;> *{box-sizing:border-box;overflow:hidden;white-space:nowrap;}"]);

exports.ModeButton = ModeButton;
ModeButton.Title = _styledComponents.default.div.withConfig({
  displayName: "styled__Title",
  componentId: "sc-122ziys-15"
})(["font-size:70%;&.disabled{color:#686868;}"]);
ModeButton.Button = _styledComponents.default.button.withConfig({
  displayName: "styled__Button",
  componentId: "sc-122ziys-16"
})(["cursor:pointer;width:100%;height:100%;svg,img{vertical-align:middle;max-width:1.25em;margin:0 0.25em;height:1.25em;}&.active{font-weight:600;box-shadow:0 0 2px 2px rgba(0,64,255,0.5);}&.disabled{cursor:default;}&.disabled svg{fill:#ccc;}"]);

const DropdownSelector = _styledComponents.default.div.withConfig({
  displayName: "styled__DropdownSelector",
  componentId: "sc-122ziys-17"
})(["> div{width:50%;display:inline-block;box-sizing:border-box;position:relative;}select{width:100%;box-sizing:border-box;cursor:pointer;}"]);

exports.DropdownSelector = DropdownSelector;

const GeneralSettingsPanel = _styledComponents.default.div.withConfig({
  displayName: "styled__GeneralSettingsPanel",
  componentId: "sc-122ziys-18"
})([""]);

exports.GeneralSettingsPanel = GeneralSettingsPanel;

const SettingsSelectorPanel = _styledComponents.default.div.withConfig({
  displayName: "styled__SettingsSelectorPanel",
  componentId: "sc-122ziys-19"
})([""]);

exports.SettingsSelectorPanel = SettingsSelectorPanel;
//# sourceMappingURL=styled.js.map