export type List = {
    id: string;
    title: string;
    resetDays?: string | undefined;
    startingDate?: Date | undefined;
};

export type Task = {
    id: string;
    description: string;
    quantity?: string | undefined;
    weight?: string | undefined;
    isChecked: boolean;
};

export type CheckDuplicate = {
    isCheckDuplicate: boolean;
};
