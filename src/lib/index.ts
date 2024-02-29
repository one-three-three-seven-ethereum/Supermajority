export const numberToPercent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})

export interface TotalDistribution {
    name: string;
    countMin: number;
    countMax: number;
    shareMin: number;
    shareMax: number;
    shareMinFormatted: string;
    shareMaxFormatted: string;
}

export interface ServiceDistribution {
    name: string;
    count: number;
    share: number;
    shareFormatted: string;
}

export interface Allocation {
    name: string;
    count: number;
}

export interface Service {
    name: string;
    website?: string;
    source?: string;
    twitter?: string;
    validators?: number;
    marketShareFormatted?: string;
    allocation: Allocation[];
}