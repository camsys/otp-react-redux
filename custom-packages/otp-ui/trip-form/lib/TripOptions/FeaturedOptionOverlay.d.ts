import { FunctionComponent } from "react";
import { Company, Modes } from "./types";
declare const FeaturedOptionOverlay: ({ featuredOption, setFeaturedOption, showBackButton, supportedModes, CompanyIcon, DetailedModeIcon }: {
    featuredOption: string;
    setFeaturedOption(option: string): void;
    showBackButton?: boolean;
    supportedCompanies: Company[];
    supportedModes: Modes;
    CompanyIcon?: FunctionComponent<{
        company: string;
    }>;
    DetailedModeIcon?: FunctionComponent<{
        mode: string;
    }>;
}) => JSX.Element;
export default FeaturedOptionOverlay;
//# sourceMappingURL=FeaturedOptionOverlay.d.ts.map