import { Category, QueryParams } from "./types";
export declare function getNonTransitModes(modeString?: string): string[];
export declare function accessModeIsWalkOnly(modeString?: string): boolean;
export declare function getSelectedModes(queryParams: QueryParams): string[];
export declare const categoryIsActive: (category: Category, selectedModes: Array<string>) => boolean;
export declare function getCategoryModes(category: Category): string[];
export declare function getCategoryPrimaryMode(category: Category): string;
export declare const isServerEnv: boolean;
//# sourceMappingURL=util.d.ts.map