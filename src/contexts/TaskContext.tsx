import {
    type ChangeEvent,
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useState,
} from 'react';

import type { Task } from '@/types/types.ts';

interface TaskContextValues {
    newTask: Task;
    setNewTask: Dispatch<SetStateAction<Task>>;
    initialState: Task;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TaskContext = createContext<TaskContextValues | null>(null);

export const TaskProvider = ({ children }: PropsWithChildren) => {
    const initialState: Task = {
        id: '',
        description: '',
        quantity: 0,
        weight: '0',
    };

    const [newTask, setNewTask] = useState<Task>(initialState);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewTask({
            ...newTask,
            [name]: value,
        });
    };

    return (
        <TaskContext.Provider
            value={{
                newTask,
                setNewTask,
                initialState,
                handleInputChange,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
