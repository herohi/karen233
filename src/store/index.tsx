import * as React from 'react';

interface IProviderProps<T> {
    initial?: T;
    children?: React.ReactNode;
}

type SetState<S> = <K extends keyof S>(
    state:
        | ((prevState: Readonly<S>, props: Readonly<any>) => Pick<S, K> | S | null)
        | (Pick<S, K> | S | null),
    callback?: () => void
) => void;

export interface IStore<T> {
    ctx: React.Context<T>;
    setState: SetState<T>;
    Provider: React.ComponentType<IProviderProps<T>>;
    [_: string]: any;
}

export function createStore<State = any>(initialState: State, displayName: string): IStore<State> {
    const ctx = React.createContext<State>(initialState);

    const listner = new Set();
    const setState = (a: any, b: any) => listner.forEach((fn: any) => fn(a, b));

    const Provider = class Provider extends React.Component<IProviderProps<State>, State> {
        public static displayName = displayName;

        public state = this.props.initial || initialState || ({} as any);

        public componentDidMount() {
            listner.add((x: any, y: any) => this.setState(x, y));
        }

        public componentWillUnmount() {
            listner.clear();
        }

        public render(): React.ReactNode {
            return <ctx.Provider value={this.state}>{this.props.children}</ctx.Provider>;
        }
    };

    return { ctx, setState, Provider };
}
