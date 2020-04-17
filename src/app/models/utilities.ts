export interface MarkerOption {
    lat?: number;
    lng?: number;
    iconOption?: IconOption;
}

export interface IconOption {
    iconUrl?: string;
    iconScaleSize?: any;
    iconTitle?: string;
    iconInfo?: string;
    iconMaxWidth?: number;
}