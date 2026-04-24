import { useContext } from 'react';

import { ThemeContext } from '@/contexts/ThemeContext.tsx';

export const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('Theme Context must be used within its provider');
    }

    return context;
};
