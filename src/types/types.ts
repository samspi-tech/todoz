export type List = {
    id: string;
    title: string;
};

export type Task = {
    id: string;
    description: string;
    quantity: number;
};

export type Tasks = {
    listId: string;
    tasks: Task[];
};
