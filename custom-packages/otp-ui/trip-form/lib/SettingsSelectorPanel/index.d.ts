import CSS from "csstype";
import { ReactElement } from "react";
import type { ConfiguredCompany, ConfiguredModes, CustomQueryParameters, ModeIconType, QueryParamChangeEvent, QueryParams } from "../types";
interface SettingsSelectorPanelProps {
    /**
     * The CSS class name to apply to this element.
     */
    className?: string;
    /**
     * The icon component for rendering mode icons. Defaults to the OTP-UI TriMetModeIcon component.
     */
    ModeIcon?: ModeIconType;
    /**
     * Triggered when a query parameter is changed.
     * @param params An object that contains the new values for the parameter(s) that has (have) changed.
     */
    onQueryParamChange?: (evt: QueryParamChangeEvent) => void;
    /**
     * An object {parameterName: value, ...} whose attributes correspond to query parameters.
     * For query parameter names and value formats,
     * see https://github.com/opentripplanner/otp-ui/blob/master/packages/core-utils/src/__tests__/query.js#L14
     */
    queryParams?: QueryParams;
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
     * Standard React inline style prop.
     */
    style?: CSS.Properties;
    /**
     * An array of supported companies that will be displayed as options where applicable.
     */
    supportedCompanies?: ConfiguredCompany[];
    /**
     * Supported modes that will be displayed as primary, secondary, tertiary options.
     */
    supportedModes: ConfiguredModes;
}
/**
 * The Settings Selector Panel allows the user to set trip search preferences,
 * such as modes, providers, and speed preferences.
 */
export default function SettingsSelectorPanel({ className, ModeIcon, onQueryParamChange, queryParams, queryParamMessages, style, supportedCompanies, supportedModes }: SettingsSelectorPanelProps): ReactElement;
export {};
//# sourceMappingURL=index.d.ts.map