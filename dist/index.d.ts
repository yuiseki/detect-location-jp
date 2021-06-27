export declare const detectLocation: (text: string) => Promise<{
    name: string;
    state: string;
    latitude: string;
    longitude: string;
} | null>;
