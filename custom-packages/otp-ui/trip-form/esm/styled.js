import styled from "styled-components"; // eslint-disable-next-line prettier/prettier

export var SettingsHeader = styled.div.withConfig({
  displayName: "styled__SettingsHeader",
  componentId: "sc-122ziys-0"
})([""]);
export var SettingsSection = styled.div.withConfig({
  displayName: "styled__SettingsSection",
  componentId: "sc-122ziys-1"
})([""]);
export var SettingLabel = styled.label.withConfig({
  displayName: "styled__SettingLabel",
  componentId: "sc-122ziys-2"
})(["padding-left:6px;svg{width:22pt;}"]);
export var FloatingSettingLabel = styled(SettingLabel).withConfig({
  displayName: "styled__FloatingSettingLabel",
  componentId: "sc-122ziys-3"
})(["float:left;"]);
export var DateTimeSelector = styled.div.withConfig({
  displayName: "styled__DateTimeSelector",
  componentId: "sc-122ziys-4"
})([""]);
DateTimeSelector.DepartureRow = styled.div.withConfig({
  displayName: "styled__DepartureRow",
  componentId: "sc-122ziys-5"
})(["box-sizing:border-box;> *{box-sizing:border-box;width:33.333333%;padding:0px 5px;}"]);
DateTimeSelector.DateTimeRow = styled.div.withConfig({
  displayName: "styled__DateTimeRow",
  componentId: "sc-122ziys-6"
})(["box-sizing:border-box;> *{box-sizing:border-box;width:50%;padding:0px 5px;display:inline-block;}input{box-sizing:border-box;width:100%;}"]);
export var ModeSelector = styled.div.withConfig({
  displayName: "styled__ModeSelector",
  componentId: "sc-122ziys-7"
})([""]);
ModeSelector.MainRow = styled.div.withConfig({
  displayName: "styled__MainRow",
  componentId: "sc-122ziys-8"
})(["padding:0px 5px;box-sizing:border-box;> *{width:100%;}"]);
ModeSelector.SecondaryRow = styled.div.withConfig({
  displayName: "styled__SecondaryRow",
  componentId: "sc-122ziys-9"
})(["> *{width:33.333333%;padding:0px 5px;}"]);
ModeSelector.TertiaryRow = styled.div.withConfig({
  displayName: "styled__TertiaryRow",
  componentId: "sc-122ziys-10"
})(["> *{width:33.333333%;padding:0px 5px;}"]);
export var SubmodeSelector = styled(SettingsSection).withConfig({
  displayName: "styled__SubmodeSelector",
  componentId: "sc-122ziys-11"
})([""]);
var submodeRow = styled.div.withConfig({
  displayName: "styled__submodeRow",
  componentId: "sc-122ziys-12"
})([""]);
SubmodeSelector.Row = submodeRow;
SubmodeSelector.InlineRow = styled(submodeRow).withConfig({
  displayName: "styled__InlineRow",
  componentId: "sc-122ziys-13"
})(["text-align:right;"]);
export var ModeButton = styled.div.withConfig({
  displayName: "styled__ModeButton",
  componentId: "sc-122ziys-14"
})(["display:inline-block;text-align:center;box-sizing:border-box;> *{box-sizing:border-box;overflow:hidden;white-space:nowrap;}"]);
ModeButton.Title = styled.div.withConfig({
  displayName: "styled__Title",
  componentId: "sc-122ziys-15"
})(["font-size:70%;&.disabled{color:#686868;}"]);
ModeButton.Button = styled.button.withConfig({
  displayName: "styled__Button",
  componentId: "sc-122ziys-16"
})(["cursor:pointer;width:100%;height:100%;svg,img{vertical-align:middle;max-width:1.25em;margin:0 0.25em;height:1.25em;}&.active{font-weight:600;box-shadow:0 0 2px 2px rgba(0,64,255,0.5);}&.disabled{cursor:default;}&.disabled svg{fill:#ccc;}"]);
export var DropdownSelector = styled.div.withConfig({
  displayName: "styled__DropdownSelector",
  componentId: "sc-122ziys-17"
})(["> div{width:50%;display:inline-block;box-sizing:border-box;position:relative;}select{width:100%;box-sizing:border-box;cursor:pointer;}"]);
export var GeneralSettingsPanel = styled.div.withConfig({
  displayName: "styled__GeneralSettingsPanel",
  componentId: "sc-122ziys-18"
})([""]);
export var SettingsSelectorPanel = styled.div.withConfig({
  displayName: "styled__SettingsSelectorPanel",
  componentId: "sc-122ziys-19"
})([""]);
//# sourceMappingURL=styled.js.map