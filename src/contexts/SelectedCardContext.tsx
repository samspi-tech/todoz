import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useState,
} from 'react';

interface SelectedCardContextValues {
    cardTitle: string | null;
    setCardTitle: Dispatch<SetStateAction<string | null>>;
}

export const SelectedCardContext =
    createContext<SelectedCardContextValues | null>(null);

export const SelectedCardProvider = ({ children }: PropsWithChildren) => {
    const [cardTitle, setCardTitle] = useState<string | null>(null);

    return (
        <SelectedCardContext.Provider
            value={{
                cardTitle,
                setCardTitle,
            }}
        >
            {children}
        </SelectedCardContext.Provider>
    );
};
