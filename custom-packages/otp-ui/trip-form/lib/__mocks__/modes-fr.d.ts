declare const commonModes: {
    transitModes: ({
        image: string;
        mode: string;
        label: string;
        hidden?: undefined;
    } | {
        mode: string;
        label: string;
        hidden: boolean;
        image?: undefined;
    })[];
    categories: ({
        description: string;
        id: string;
        image: any;
        label: string;
        type: string;
        options: ({
            mode: string;
            label: string;
            company?: undefined;
        } | {
            mode: string;
            label: string;
            company: string;
        })[];
        mode?: undefined;
    } | {
        description: string;
        id: string;
        image: any;
        label: string;
        type: string;
        options: ({
            mode: string;
            label: string;
            company?: undefined;
            image?: undefined;
            url?: undefined;
        } | {
            company: string;
            image: string;
            label: string;
            mode: string;
            url: string;
        })[];
        mode?: undefined;
    } | {
        description: string;
        id: string;
        image: any;
        label: string;
        type: string;
        mode: string;
        options: ({
            company: string;
            image: string;
            label: string;
            url: string;
        } | {
            company: string;
            label: string;
            url: string;
            image?: undefined;
        })[];
    } | {
        label: string;
        id: string;
        mode: string;
        type: string;
        description?: undefined;
        image?: undefined;
        options?: undefined;
    } | {
        label: string;
        id: string;
        type: string;
        options: {
            mode: string;
            label: string;
        }[];
        description?: undefined;
        image?: undefined;
        mode?: undefined;
    })[];
    accessModes: ({
        mode: string;
        label: string;
        company?: undefined;
        showWheelchairSetting?: undefined;
    } | {
        mode: string;
        label: string;
        company: string;
        showWheelchairSetting?: undefined;
    } | {
        mode: string;
        showWheelchairSetting: boolean;
        label: string;
        company: string;
    })[];
    exclusiveModes: string[];
    bicycleModes: ({
        mode: string;
        showWheelchairSetting: boolean;
        label: string;
    } | {
        mode: string;
        label: string;
        showWheelchairSetting?: undefined;
    })[];
    micromobilityModes: {
        mode: string;
        label: string;
    }[];
};
export default commonModes;
//# sourceMappingURL=modes-fr.d.ts.map