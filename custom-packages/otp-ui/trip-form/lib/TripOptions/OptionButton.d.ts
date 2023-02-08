import React from "react";
import type { ButtonProps } from "./Checkbox";
import { CheckboxIcons } from "./types";
export default function OptionButton({ checkboxIcons, checked, children, className, disabled, iconFillOverride, image, label, onClick, selected }: {
    checkboxIcons?: CheckboxIcons;
    checked: boolean;
    children?: React.ReactNode | string;
    className?: string;
    disabled?: boolean;
    iconFillOverride?: string;
    image?: string;
    label: string;
} & ButtonProps): React.ReactElement;
//# sourceMappingURL=OptionButton.d.ts.map