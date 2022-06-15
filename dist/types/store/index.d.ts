import * as React from 'react';
interface IProviderProps<T> {
    initial?: T;
    children?: React.ReactNode;
}
declare type SetState<S> = <K extends keyof S>(state: ((prevState: Readonly<S>, props: Readonly<any>) => Pick<S, K> | S | null) | (Pick<S, K> | S | null), callback?: () => void) => void;
export interface IStore<T> {
    ctx: React.Context<T>;
    setState: SetState<T>;
    Provider: React.ComponentType<IProviderProps<T>>;
    [_: string]: any;
}
export declare function createStore<State = any>(initialState: State, displayName: string): IStore<State>;
export {};
