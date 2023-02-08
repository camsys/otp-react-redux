declare const modeOptions: {
    primary: {
        id: string;
        title: string;
        text: JSX.Element;
    };
    secondary: ({
        id: string;
        title: string;
        text: JSX.Element;
        selected?: undefined;
        showTitle?: undefined;
    } | {
        id: string;
        title: string;
        selected: boolean;
        showTitle: boolean;
        text: JSX.Element;
    })[];
    tertiary: {
        id: string;
        title: string;
        text: JSX.Element;
    }[];
};
export default modeOptions;
//# sourceMappingURL=mode-options.d.ts.map