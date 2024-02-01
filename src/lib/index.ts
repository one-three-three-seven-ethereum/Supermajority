import { ref } from "vue";

export const numberToPercent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
})

export const showGethTooltips = ref(false)

export interface Distribution {
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