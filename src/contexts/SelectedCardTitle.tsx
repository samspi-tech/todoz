import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useState,
} from 'react';

interface SelectedCardTitleValues {
    selectedCardTitle: string | null;
    setSelectedCardTitle: Dispatch<SetStateAction<string | null>>;
}

export const SelectedCardTitle = createContext<SelectedCardTitleValues | null>(
    null
);

export const SelectedCardTitleProvider = ({ children }: PropsWithChildren) => {
    const [selectedCardTitle, setSelectedCardTitle] = useState<string | null>(
        null
    );

    return (
        <SelectedCardTitle.Provider
            value={{
                selectedCardTitle,
                setSelectedCardTitle,
            }}
        >
            {children}
        </SelectedCardTitle.Provider>
    );
};
