import {
    createContext,
    type PropsWithChildren,
    useEffect,
    useState,
} from 'react';

interface ThemeContextValues {
    isDarkMode: boolean;
    handleToggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValues | null>(null);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const localStorageTheme = localStorage.getItem('theme');

        if (!localStorageTheme) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        return JSON.parse(localStorageTheme) === 'dark';
    });

    const handleToggleDarkMode = () => {
        setIsDarkMode((prevState) => !prevState);
    };

    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', theme);

        localStorage.setItem('theme', JSON.stringify(theme));
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider
            value={{
                isDarkMode,
                handleToggleDarkMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
