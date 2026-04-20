import { Ellipsis } from 'lucide-react';
import { useEffect, useState } from 'react';

import Button from '@/components/button/Button.tsx';
import Popover from '@/components/popover/Popover.tsx';
import OptionsDropdownMenu from '@/components/optionsDropdownMenu/OptionsDropdownMenu.tsx';

import type { Task } from '@/types/types.ts';
import styles from './TaskCard.module.css';
import { useModal } from '@/hooks/useModal.ts';
import { useSelectedCardContext } from '@/hooks/useSelectedCardContext.ts';
import { useTaskContext } from '@/hooks/useTaskContext.ts';

interface TaskCardProps {
    task: Task;
    listId: string;
}

const TaskCard = ({ task, listId }: TaskCardProps) => {
    const [isActiveAnchor, setIsActiveAnchor] = useState(false);

    const { deleteTask } = useTaskContext();
    const { popoverRef, handleOpenPopover } = useModal();
    const { cardTitle, setCardTitle } = useSelectedCardContext();

    const { description, quantity, weight, id } = task;

    useEffect(() => {
        if (cardTitle === description) {
            setIsActiveAnchor(true);
        } else {
            setIsActiveAnchor(false);
        }
    }, [cardTitle]);

    return (
        <>
            <li className={styles.listContainer}>
                <input type="checkbox" id="completeTask" name="completeTask" />

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
                    onEdit={() => {}}
                    onDelete={() => deleteTask(listId, id)}
                />
            </Popover>
        </>
    );
};

export default TaskCard;
