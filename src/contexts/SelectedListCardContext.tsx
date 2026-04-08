import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useState,
} from 'react';

interface SelectedListCardContextValues {
    cardTitle: string | null;
    setCardTitle: Dispatch<SetStateAction<string | null>>;
}

export const SelectedListCardContext =
    createContext<SelectedListCardContextValues | null>(null);

export const SelectedListCardProvider = ({ children }: PropsWithChildren) => {
    const [cardTitle, setCardTitle] = useState<string | null>(null);

    return (
        <SelectedListCardContext.Provider
            value={{
                cardTitle,
                setCardTitle,
            }}
        >
            {children}
        </SelectedListCardContext.Provider>
    );
};
