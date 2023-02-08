import CSS from "csstype";
import { ReactElement } from "react";
import type { QueryParamChangeEvent } from "../types";
interface DropdownSelectorProps {
    /**
     * The CSS class name(s) to apply to this element.
     */
    className?: string;
    /**
     * The contents of the contained <label> control.
     */
    label?: ReactElement | string;
    /**
     * A unique name for the setting.
     */
    name?: string;
    /**
     * Triggered when the value of the <select> control changes.
     * @param arg The data {name: value} for the selected option.
     */
    onChange?: (evt: QueryParamChangeEvent) => void;
    /**
     * A list of {text, value} options for the <select> control.
     */
    options: {
        text: string;
        value: string | number;
    }[];
    /**
     * Standard React inline style prop.
     */
    style?: CSS.Properties;
    /**
     * The initially-selected value for the contained <select> control.
     */
    value?: string | number;
}
/**
 * A wrapper that includes a <select> dropdown control and a <label> for the dropdown control.
 */
export default function DropdownSelector({ className, label, name, onChange, options, style, value }: DropdownSelectorProps): ReactElement;
export {};
//# sourceMappingURL=index.d.ts.map