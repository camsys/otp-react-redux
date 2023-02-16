import React from "react";
import { CheckboxIcons, Modes, QueryParams } from "./types";
declare const ModeRow: ({ checkboxIcons, onQueryParamChange, queryParamOverrides, queryParams, SimpleModeIcon, supportedModes }: {
    onQueryParamChange(paramsToUpdate: QueryParams, categoryId?: string): void;
    checkboxIcons?: CheckboxIcons;
    queryParamOverrides: {
        [key: string]: QueryParams;
    };
    queryParams: QueryParams;
    SimpleModeIcon?: React.FunctionComponent<{
        mode: string;
    }>;
    supportedModes: Modes;
}) => React.ReactElement;
export default ModeRow;
//# sourceMappingURL=ModeRow.d.ts.map