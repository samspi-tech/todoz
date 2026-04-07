import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import Popover from '@/components/popover/Popover.tsx';
import Button from '@/components/button/Button.tsx';
import OptionsDropdownMenu from '@/components/optionsDropdownMenu/OptionsDropdownMenu.tsx';

import styles from './TasksListCard.module.css';
import type { TasksListType } from '@/types/types.ts';
import { useModal } from '@/hooks/useModal.ts';
import { useSelectedButtonAnchorContext } from '@/hooks/useSelectedButtonAnchorContext.ts';
import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';
import Modal from '@/components/modal/Modal.tsx';
import TasksListForm from '@/components/tasksListForm/TasksListForm.tsx';

interface TasksListCardProps {
    cardDetails: TasksListType;
}

const TasksListCard = ({ cardDetails }: TasksListCardProps) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isActiveAnchor, setIsActiveAnchor] = useState(false);

    const navigate = useNavigate();
    const { deleteSingleTasksList, setError, setTitle } = useTaskListsContext();

    const { selectedCardTitle, setSelectedCardTitle } =
        useSelectedButtonAnchorContext();

    const {
        popoverRef,
        handleOpenPopover,
        modalRef,
        handleOpenModal,
        handleCloseModal,
    } = useModal();

    const { id, title } = cardDetails;

    useEffect(() => {
        if (selectedCardTitle === title) {
            setIsActiveAnchor(true);
        } else {
            setIsActiveAnchor(false);
        }
    }, [selectedCardTitle]);

    return (
        <>
            <article className={styles.card}>
                <header>
                    <Button
                        size="small"
                        variant="square"
                        isAnchor={isActiveAnchor}
                        onClick={() => {
                            handleOpenPopover();
                            setSelectedCardTitle(title);
                        }}
                    >
                        <EllipsisVertical />
                    </Button>

                    <Popover ref={popoverRef}>
                        <OptionsDropdownMenu
                            onEdit={() => {
                                setTitle(title);
                                handleOpenModal();
                            }}
                            onDelete={() => deleteSingleTasksList(id)}
                        />
                    </Popover>
                </header>

                <div
                    className={`${styles.cardBody} ${isPressed && styles.pressed}`}
                    onTouchStart={() => setIsPressed(true)}
                    onTouchEnd={() => setIsPressed(false)}
                    onClick={() =>
                        navigate(`/tasks/${id}`, { viewTransition: true })
                    }
                >
                    <h3>{title}</h3>
                </div>
            </article>

            <Modal
                ref={modalRef}
                title="Edit your list"
                onClose={() => {
                    setError(null);
                    handleCloseModal();
                }}
            >
                <TasksListForm
                    isUpdate
                    editListId={id}
                    defaultTitle={title}
                    onClose={handleCloseModal}
                />
            </Modal>
        </>
    );
};

export default TasksListCard;
