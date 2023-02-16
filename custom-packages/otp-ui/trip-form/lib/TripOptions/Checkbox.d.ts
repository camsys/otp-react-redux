import React, { FunctionComponent, ReactElement } from "react";
import { CheckboxIcons } from "./types";
export interface ButtonProps {
    ariaChecked?: boolean;
    ariaLabel?: string;
    disabled?: boolean;
    inset?: boolean;
    mode?: string;
    onClick(): void;
    selected: boolean;
}
export default function Checkbox(props: {
    checkboxIcons?: CheckboxIcons;
    checked: boolean;
    children: React.ReactNode | string;
    className?: string;
    innerRef?: React.MutableRefObject<HTMLInputElement>;
    SimpleModeIcon?: FunctionComponent<{
        mode: string;
    }>;
} & ButtonProps): ReactElement;
//# sourceMappingURL=Checkbox.d.ts.map