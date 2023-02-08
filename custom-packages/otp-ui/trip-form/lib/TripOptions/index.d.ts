import { FunctionComponent, ReactElement } from "react";
import { CheckboxIcons, Company, QueryProps } from "./types";
import * as S from "./styled";
interface ComponentProps {
    /**
     * Object of icon props used to overwrite the checkmark and plus icons
     */
    checkboxIcons?: CheckboxIcons;
    /**
     * Classnames to add to the container div to allow additional styling
     */
    className?: string;
    /**
     * Icon prop used for overwriting company logos throughout the component
     */
    CompanyIcon?: FunctionComponent<{
        company: string;
    }>;
    /**
     * Whether to display the built-in back button in the featured mode overlay. If the button is disabled,
     * featuredItemOverlayEnabled should be used to hide the overlay.
     */
    featuredItemOverlayBackButton?: boolean;
    /**
     * If this prop is set to false, the featured item overlay will immediately disappear.
     * This can be used in conjunction with featuredItemOverlayBackButton to replace the back
     * button.
     *
     * If passing a useState hook to this component, this prop should be the value of the useState output.
     */
    featuredItemOverlayEnabled?: boolean;
    /**
     * If this prop is passed, any updates to the featured item overlay will be
     * reported to the function passed. This can be used to keep track of if the overlay is open.
     *
     * If passing a useState hook to this component, this prop should be the setter of the useState output.
     */
    featuredItemOverlayShown?: (overlayShown: boolean) => void;
    /**
     * React element to be rendered below
     * the rest of the element
     */
    footer?: ReactElement;
    /**
     * List of company objects to include in the
     * featured options
     */
    supportedCompanies: Company[];
    /**
     * An optional prop to override svg fill color of CompanyIcons
     * Note: this will only work if the image field of the option is an svg
     */
    tripOptionIconFillOverride?: string;
    /**
     * Icon prop used for overwriting mode icons throughout the component
     */
    SimpleModeIcon?: FunctionComponent<{
        mode: string;
    }>;
    /**
     * Icon prop used for overwriting the question mark icon throughout the component
     */
    QuestionIcon: ReactElement;
}
declare type Props = ComponentProps & QueryProps;
/**
 * This component renders the custom TriMet Mode Selector
 */
export default function TripOptions(props: Props): ReactElement;
export { S as Styled };
//# sourceMappingURL=index.d.ts.map