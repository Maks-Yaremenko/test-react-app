import { useState } from 'react';

export interface UseLoading {
    loading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}

export const useLoading = (initialValue: boolean): UseLoading => {
    const [loading, setLoading] = useState(initialValue);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    return { loading, startLoading, stopLoading };
}
