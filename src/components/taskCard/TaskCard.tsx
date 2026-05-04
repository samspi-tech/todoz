import { CalendarDays, Clock, Ellipsis, Hash, Weight } from 'lucide-react';
import { useEffect, useState } from 'react';

import Button from '@/components/button/Button.tsx';
import Popover from '@/components/popover/Popover.tsx';
import OptionsDropdownMenu from '@/components/optionsDropdownMenu/OptionsDropdownMenu.tsx';
import TaskForm from '@/components/taskForm/TaskForm.tsx';
import Modal from '@/components/modal/Modal.tsx';
import TaskCheckbox from '@/components/taskCard/partials/TaskCheckbox.tsx';

import type { Task } from '@/types/types.ts';
import styles from './TaskCard.module.css';
import { useModal } from '@/hooks/useModal.ts';
import { useSelectedCardContext } from '@/hooks/useSelectedCardContext.ts';
import { useTaskContext } from '@/hooks/useTaskContext.ts';
import { formatDateAndTime } from '@/utils/helpers.ts';

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

    const { description, quantity, weight, weightUnit, id, dateTime } = task;
    const formattedDateTime = formatDateAndTime(dateTime);

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

                    <small>
                        {!!Number(quantity) && (
                            <span>
                                <Hash />
                                {quantity}
                            </span>
                        )}

                        {!!Number(weight) && (
                            <span>
                                <Weight />
                                {weight} {weightUnit}
                            </span>
                        )}

                        {dateTime && (
                            <>
                                <span>
                                    <CalendarDays />
                                    {formattedDateTime?.date}
                                </span>

                                <span>
                                    <Clock />
                                    {formattedDateTime?.time}
                                </span>
                            </>
                        )}
                    </small>
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
                    onEdit={() => {
                        handleOpenModal();
                        setNewTask(task);
                    }}
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
