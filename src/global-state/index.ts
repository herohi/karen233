import { useEffect, useState } from 'react';
import { EventBus } from '../event-bus';

interface UseGlobalState<T> {
    (): [value: T, set: (val: T) => void];
    use: UseGlobalState<T>;
    val: T;
    reset: () => void;
}

export function createGlobalState<T>(initial: T): UseGlobalState<T> {
    const eventBus = new EventBus();

    let _value = initial;

    function useGlobalState() {
        const [value, setValue] = useState(_value);

        useEffect(() => {
            const listener = eventBus.listen((val: T) => setValue(val));

            return () => eventBus.unlisten(listener);
        }, []);

        const set = (val: T) => {
            _value = val;

            eventBus.emit(val);
        };

        return [value, set];
    }

    useGlobalState.use = useGlobalState;
    useGlobalState.reset = () => eventBus.emit(initial);

    Object.defineProperty(useGlobalState, 'val', {
        get: () => Object.freeze(_value),
    });

    return useGlobalState as UseGlobalState<T>;
}
