import CSS from "csstype";
import { ReactElement } from "react";
import type { QueryParamChangeEvent } from "../types";
interface CheckboxSelectorProps {
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
     * Triggered when the value of the <input> control changes.
     */
    onChange?: (evt: QueryParamChangeEvent) => void;
    /**
     * Standard React inline style prop.
     */
    style?: CSS.Properties;
    /**
     * The initial value for the contained <input> control.
     */
    value?: string | boolean;
}
/**
 * A wrapper that includes an <input type="select" /> control and a <label> for the input control.
 */
export default function CheckboxSelector({ className, label, name, onChange, style, value }: CheckboxSelectorProps): ReactElement;
export {};
//# sourceMappingURL=index.d.ts.map