import { IntlShape } from "react-intl";
import type { ConfiguredCompany, ConfiguredModes, FullModeOption, ModeIconType, ModeOption, ModeSelectorOption, ModeSelectorOptionSet } from "./types";
export declare function isBike(mode: string): boolean;
/**
 * Helper function so that TypeScript propagates the correct underlying type for ModeOption.
 */
export declare function isFullModeOption(modeOption: ModeOption): modeOption is FullModeOption;
/**
 * Obtains the mode-as-a-string from a mode object found in the configuration.
 * In config.yaml, you can write either:
 *   transitModes:    -or-   transitModes:
 *   - BUS                   - mode: BUS
 *   - RAIL                    label: Bus
 *                           - mode: RAIL
 *                             label: Commuter Rail
 *
 * @param modeObj The mode object per the configuration to convert.
 */
export declare function getModeString(modeObj: ModeOption): string;
/**
 * Returns an array containing the company ids, in upper case for MOD UI URLs, for the specified mode id.
 * The mode id scheme is set and used by function getTransitCombinedModeOptions().
 * @param id The mode id to process.
 * @param supportedCompanies The list of supported companies (see structure in __mocks__/companies.js).
 */
export declare function getCompaniesForModeId(id: string, supportedCompanies: ConfiguredCompany[]): {
    defaultAccessModeCompany?: string[];
    companies: string[];
    nonTransitModes: string[];
};
/**
 * Returns the available transit modes (rail, bus, etc.).
 * @param ModeIcon The icon component for rendering.
 * @param modes The available modes to choose from.
 * @param selectedModes The modes that should appear selected.
 */
export declare function getTransitSubmodeOptions(ModeIcon: ModeIconType, modes: ConfiguredModes, selectedModes: string[]): ModeSelectorOption[];
/**
 * Generates the options (primary, secondary, tertiary) for the mode selector based on the modes read from config.yaml.
 * @param ModeIcon The icon component for rendering.
 * @param modes The available modes to choose from.
 * @param selectedModes An array of string that lists the modes selected for a trip query.
 * @param selectedCompanies The companies to show as selected (when the user selects an exclusive mode operated by multiple companies).
 * @param supportedCompanies The supported companies for certain access modes.
 * @param intl The IntlShape object from react-intl.
 * @param defaultMessages The default messages shown if no i18n messages are provided.
 */
export declare function getModeOptions(ModeIcon: ModeIconType, modes: ConfiguredModes, selectedModes: string[], selectedCompanies: string[], supportedCompanies: ConfiguredCompany[], intl: IntlShape, defaultMessages: Record<string, string>): ModeSelectorOptionSet;
/**
 * Returns the UI options for the specified companies, modes, and selection.
 * @param companies The supported companies per OTP configuration.
 * @param modes The desired modes for which to get the operating companies.
 * @param selectedCompanies The companies to render selected from the UI.
 * @returns An array of UI options (should not be undefined as companies is an array).
 */
export declare function getCompaniesOptions(companies: ConfiguredCompany[], modes: string[], selectedCompanies: string[]): ModeSelectorOption[];
/**
 * Returns the UI options for the specified bike/micromobility modes and selection.
 * @param ModeIcon The component for rendering icons.
 * @param modes The supported bike or micromobility modes.
 * @param selectedModes The modes to render selected from the UI.
 * @returns An array of UI options, or undefined if modes is undefined.
 */
export declare function getBicycleOrMicromobilityModeOptions(ModeIcon: ModeIconType, modes: ModeOption[], selectedModes: string[]): ModeSelectorOption[];
//# sourceMappingURL=util.d.ts.map