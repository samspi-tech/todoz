import { Ellipsis } from 'lucide-react';
import { useEffect, useState } from 'react';

import Button from '@/components/button/Button.tsx';
import Popover from '@/components/popover/Popover.tsx';
import OptionsDropdownMenu from '@/components/optionsDropdownMenu/OptionsDropdownMenu.tsx';
import TaskForm from '@/components/taskForm/TaskForm.tsx';
import Modal from '@/components/modal/Modal.tsx';

import type { Task } from '@/types/types.ts';
import styles from './TaskCard.module.css';
import { useModal } from '@/hooks/useModal.ts';
import { useSelectedCardContext } from '@/hooks/useSelectedCardContext.ts';
import { useTaskContext } from '@/hooks/useTaskContext.ts';
import TaskCheckbox from '@/components/taskCard/partials/TaskCheckbox.tsx';

interface TaskCardProps {
    task: Task;
    listId: string;
    isChecked?: boolean;
}

const TaskCard = ({ task, listId, isChecked = false }: TaskCardProps) => {
    const [isActiveAnchor, setIsActiveAnchor] = useState(false);

    const { cardTitle, setCardTitle } = useSelectedCardContext();
    const { deleteTask, setNewTask, initialState } = useTaskContext();

    const {
        popoverRef,
        handleOpenPopover,
        modalRef,
        handleOpenModal,
        handleCloseModal,
    } = useModal();

    const { description, quantity, weight, id } = task;

    const handleEditTask = () => {
        const taskToEdit = {
            ...task,
            weight: weight?.slice(0, -2),
        };

        handleOpenModal();
        setNewTask(taskToEdit);
    };

    useEffect(() => {
        if (cardTitle === description) {
            setIsActiveAnchor(true);
        } else {
            setIsActiveAnchor(false);
        }
    }, [cardTitle]);

    return (
        <>
            <li
                className={`${styles.listContainer} ${isChecked && styles.checked}`}
            >
                <TaskCheckbox task={task} listId={listId} />

                <div>
                    <p>{description}</p>
                    <span>
                        {quantity && <small>Nº {quantity}</small>}
                        {weight && <small>{weight}</small>}
                    </span>
                </div>

                <Button
                    size="small"
                    variant="unstyled"
                    isAnchor={isActiveAnchor}
                    onClick={() => {
                        handleOpenPopover();
                        setCardTitle(description);
                    }}
                >
                    <Ellipsis />
                </Button>
            </li>

            <Popover ref={popoverRef}>
                <OptionsDropdownMenu
                    onEdit={handleEditTask}
                    onDelete={() => deleteTask(listId, id)}
                />
            </Popover>

            <Modal
                title="Edit"
                onClose={() => {
                    handleCloseModal();
                    setNewTask(initialState);
                }}
                ref={modalRef}
            >
                <TaskForm
                    isUpdate
                    taskId={id}
                    listId={listId}
                    onClose={handleCloseModal}
                />
            </Modal>
        </>
    );
};

export default TaskCard;
