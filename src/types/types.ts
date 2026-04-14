export type List = {
    id: string;
    title: string;
};

export type Task = {
    id: string;
    description: string;
    quantity: string | undefined;
    weight: string | undefined;
    isChecked: boolean;
};
