import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Takes component's default props messages and its instance props messages and
 * returns the merged messages. The returned object will ensure that the default
 * messages are substituted for any translation strings that were missing in the
 * props. Note: this does not account for messages in nested objects (e.g.,
 * messages.header.description).
 */

/* eslint-disable import/prefer-default-export */
export function mergeMessages(defaultPropsMessages, propsMessages) {
  var defaultMessages = defaultPropsMessages || {};
  var instanceMessages = propsMessages || {};
  return _objectSpread(_objectSpread({}, defaultMessages), instanceMessages);
}
//# sourceMappingURL=messages.js.map