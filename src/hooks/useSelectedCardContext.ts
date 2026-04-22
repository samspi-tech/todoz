import { useContext } from 'react';

import { SelectedCardContext } from '@/contexts/SelectedCardContext.tsx';

export const useSelectedCardContext = () => {
    const context = useContext(SelectedCardContext);

    if (!context) {
        throw new Error(
            'Selected Card Context must be used within its provider'
        );
    }

    return context;
};
