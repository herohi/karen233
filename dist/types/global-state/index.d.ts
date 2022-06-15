interface UseGlobalState<T> {
    (): [value: T, set: (val: T) => void];
    use: UseGlobalState<T>;
    val: T;
    reset: () => void;
}
export declare function createGlobalState<T>(initial: T): UseGlobalState<T>;
export {};
