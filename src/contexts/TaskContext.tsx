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
    updateTask: (listId: string, id: string, updatedTask: Task) => void;
    deleteTask: (listId: string, id: string) => void;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
    checkTaskDuplicate: (id: string) => boolean;
    initialState: Task;
    resetTasks: (listId: string) => void;
    handleInputChange: (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}

export const TaskContext = createContext<TaskContextValues | null>(null);

export const TaskProvider = ({ children }: PropsWithChildren) => {
    const initialState: Task = {
        id: '',
        description: '',
        quantity: '',
        weight: '',
        weightUnit: 'g.',
        isChecked: false,
    };

    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newTask, setNewTask] = useState<Task>(initialState);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
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

    const checkTaskDuplicate = (id: string) => {
        return tasks.map((task) => task.id).includes(id);
    };

    const deleteTask = (listId: string, id: string) => {
        const localStorageTasks = localStorage.getItem(listId);

        if (localStorageTasks) {
            const parsedTasks: Task[] = JSON.parse(localStorageTasks);

            const updatedTasks = parsedTasks.filter((task) => task.id !== id);

            localStorage.setItem(listId, JSON.stringify(updatedTasks));
            getAllTasks(listId);
        }
    };

    const updateTask = (listId: string, id: string, updatedTask: Task) => {
        const localStorageTasks = localStorage.getItem(listId);

        if (localStorageTasks) {
            const parsedTasks: Task[] = JSON.parse(localStorageTasks);

            const tasks = parsedTasks.map((task) => {
                if (task.id === id) {
                    return { ...updatedTask };
                } else {
                    return task;
                }
            });

            localStorage.setItem(listId, JSON.stringify(tasks));
        }
    };

    const resetTasks = (listId: string) => {
        const localStorageTasks = localStorage.getItem(listId);

        if (localStorageTasks) {
            const parsedTasks: Task[] = JSON.parse(localStorageTasks);

            const tasks = parsedTasks.map((task) => {
                return { ...task, isChecked: false };
            });

            localStorage.setItem(listId, JSON.stringify(tasks));
            getAllTasks(listId);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                newTask,
                setNewTask,
                tasks,
                getAllTasks,
                updateTask,
                deleteTask,
                initialState,
                checkTaskDuplicate,
                handleInputChange,
                resetTasks,
                error,
                setError,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
