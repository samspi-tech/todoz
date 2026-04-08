import { useContext } from 'react';

import { SelectedListCardContext } from '@/contexts/SelectedListCardContext.tsx';

export const useSelectedListCardContext = () => {
    const context = useContext(SelectedListCardContext);

    if (!context) {
        throw new Error(
            'Selected List Card Context must be used within its provider'
        );
    }

    return context;
};
