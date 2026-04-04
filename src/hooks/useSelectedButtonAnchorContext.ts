import { useContext } from 'react';

import { SelectedCardTitle } from '@/contexts/SelectedCardTitle.tsx';

export const useSelectedButtonAnchorContext = () => {
    const context = useContext(SelectedCardTitle);

    if (!context) {
        throw new Error(
            'Selected Button Anchor Context must be used within its provider'
        );
    }

    return context;
};
