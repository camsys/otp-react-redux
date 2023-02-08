import CSS from "csstype";
import { ReactElement } from "react";
import type { ConfiguredModes, CustomQueryParameters, QueryParamChangeEvent } from "../types";
import type { QueryParams } from "../TripOptions/types";
interface GeneralSettingsPanelProps {
    /**
     * The CSS class name to apply to this element.
     */
    className?: string;
    /**
     * An object {parameterName: value, ...} whose attributes correspond to query parameters.
     * For query parameter names and value formats,
     * see https://github.com/opentripplanner/otp-ui/blob/master/packages/core-utils/src/__tests__/query.js#L14
     */
    query?: QueryParams;
    /**
     * An optional object that defines customizations for certain query parameters
     * to change the label or list of options (both text and values) displayed for the desired parameters.
     * Customizations can be as few or as many as needed.
     * For a given parameter, default values from core-utils are used if no customization is provided.
     * If custom options are provided for a parameter, only those provided will be displayed.
     *
     * For query parameter names and value formats,
     * see https://github.com/opentripplanner/otp-ui/blob/master/packages/core-utils/src/__tests__/query.js#L14
     */
    queryParamMessages?: CustomQueryParameters;
    /**
     * An array of parameter names to support in the settings panel.
     * See the `query` parameter for more on query parameter names.
     */
    paramNames?: string[];
    /**
     * Triggered when the value of a trip setting is changed by the user.
     * @param arg The data {name: value} of the changed trip setting.
     */
    onQueryParamChange?: (e: QueryParamChangeEvent) => void;
    /**
     * Standard React inline style prop.
     */
    style?: CSS.Properties;
    /**
     * An array of supported modes that will be displayed as options.
     */
    supportedModes: ConfiguredModes;
}
/**
 * The general settings panel for setting speed and routing optimization controls.
 */
export default function GeneralSettingsPanel({ className, onQueryParamChange, paramNames, query, queryParamMessages, style, supportedModes }: GeneralSettingsPanelProps): ReactElement;
export {};
//# sourceMappingURL=index.d.ts.map