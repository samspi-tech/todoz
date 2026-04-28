export type List = {
    id: string;
    title: string;
    daysReset?: string | undefined;
    dateCreated?: Date | undefined;
};

export type Task = {
    id: string;
    description: string;
    quantity?: string | undefined;
    weight?: string | undefined;
    weightUnit?: string | undefined;
    isChecked: boolean;
};

export type CheckDuplicate = {
    isCheckDuplicate: boolean;
};
