export type List = {
    id: string;
    title: string;
    daysReset?: string;
    dateCreated?: Date;
    dateUpdated?: Date;
};

export type Task = {
    id: string;
    description: string;
    quantity?: string;
    weight?: string;
    weightUnit?: string;
    isChecked: boolean;
};
