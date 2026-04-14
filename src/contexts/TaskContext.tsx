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
    tasks: Task[];
    getAllTasks: (listId: string) => void;
    initialState: Task;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TaskContext = createContext<TaskContextValues | null>(null);

export const TaskProvider = ({ children }: PropsWithChildren) => {
    const initialState: Task = {
        id: '',
        description: '',
        quantity: '',
        weight: '',
        isChecked: false,
    };

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Task>(initialState);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewTask({
            ...newTask,
            [name]: value,
        });
    };

    const getAllTasks = (listId: string) => {
        setTasks([]);
        const localStorageTasks = localStorage.getItem(listId);

        if (localStorageTasks) {
            const parsedLocalStorageTasks = JSON.parse(localStorageTasks);
            setTasks(parsedLocalStorageTasks);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                newTask,
                setNewTask,
                tasks,
                getAllTasks,
                initialState,
                handleInputChange,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
