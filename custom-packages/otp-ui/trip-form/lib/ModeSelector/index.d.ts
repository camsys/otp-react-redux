import CSS from "csstype";
import { ReactElement } from "react";
import { ModeSelectorOptionSet } from "../types";
interface ModeSelectorProps {
    /**
     * The CSS class name to apply to this element.
     */
    className?: string;
    /**
     * An object that defines the primary mode, and secondary and tertiary modes for the trip query.
     */
    modes: ModeSelectorOptionSet;
    /**
     * Triggered when the user selects a different mode.
     * @param id The id of the new option clicked.
     */
    onChange: (InputEvent: any) => void;
    /**
     * Standard React inline style prop.
     */
    style?: CSS.Properties;
}
/**
 * ModeSelector is the control container where the OTP user selects
 * the transportation modes for a trip query, e.g. transit+bike, walk, micromobility...
 */
export default function ModeSelector({ className, modes, onChange, style }: ModeSelectorProps): ReactElement;
export {};
//# sourceMappingURL=index.d.ts.map