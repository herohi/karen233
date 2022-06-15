import dayjs, { UnitTypeShort } from 'dayjs';
import { useState, useEffect } from 'react';
import { createGlobalState } from '../global-state';

const last = (s: string): any => s[s.length - 1];

export function createCache<T>(loader: () => Promise<T>, cachedTime: number | string) {
    const cacheState = createGlobalState(undefined);

    let expiredTime = null;
    const refreshExpiredTime = () => {
        const units: UnitTypeShort[] = ['d', 'h', 's', 'm', 'ms'];
        const unit =
            typeof cachedTime === 'string' && units.includes(last(cachedTime)) && last(cachedTime);
        const num = unit ? +cachedTime.slice(0, cachedTime.length) : +cachedTime;

        expiredTime = +dayjs().add(num, (unit as UnitTypeShort) || 'm');
    };

    const isExpired = () => expiredTime > +dayjs();

    let isFetching = false;

    function useCache() {
        const [data, setData] = cacheState.use();
        const [error, setError] = useState();
        const [loading, setLoading] = useState(isFetching);

        const fetchData = async () => {
            if (isFetching) {
                return;
            }

            isFetching = true;
            setLoading(true);

            try {
                const data = await loader();

                setData(data);
                refreshExpiredTime();
            } catch (err) {
                setError(err);
            }

            isFetching = false;
            setLoading(false);
        };

        useEffect(() => {
            if (!data || (data && isExpired())) {
                fetchData();
            }
        }, []);

        return { data, error, loading, refresh: fetchData };
    }

    useCache.clear = () => cacheState.reset();
    useCache.data = () => cacheState.val;

    return useCache;
}
