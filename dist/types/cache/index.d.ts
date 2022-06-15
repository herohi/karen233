export declare function createCache<T>(loader: () => Promise<T>, cachedTime: number | string): {
    (): {
        data: any;
        error: undefined;
        loading: boolean;
        refresh: () => Promise<void>;
    };
    clear(): void;
    data(): any;
};
