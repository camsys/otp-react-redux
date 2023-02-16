import CSS from "csstype";
import { ReactElement, ReactNode } from "react";
import type { ModeSelectorOption } from "../types";
interface SubmodeSelectorProps {
    /**
     * The CSS class name to apply to this element.
     */
    className?: string;
    /**
     * Determines how the label and mode buttons are displayed.
     */
    inline?: boolean;
    /**
     * The optional text to display before the submodes.
     */
    label?: ReactNode;
    /**
     * An array of submodes for the trip query, i.e. transit modes, TNC, or rental companies.
     */
    modes?: ModeSelectorOption[];
    /**
     * Triggered when the user toggles a submode.
     * @param id The id of the option clicked.
     */
    onChange: (id: string) => void;
    /**
     * Standard React inline style prop.
     */
    style?: CSS.Properties;
}
/**
 * SubmodeSelector is the control container where the OTP user selects
 * the submodes (e.g. train, bus) for transit, or the providers for TNC and rental companies.
 */
export default function SubmodeSelector({ className, inline, label, modes, onChange, style }: SubmodeSelectorProps): ReactElement;
export {};
//# sourceMappingURL=index.d.ts.map