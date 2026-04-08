import { useContext } from 'react';

import { ListContext } from '@/contexts/ListContext.tsx';

export const useListContext = () => {
    const context = useContext(ListContext);

    if (!context) {
        throw new Error('List Context must be used within its provider');
    }

    return context;
};
