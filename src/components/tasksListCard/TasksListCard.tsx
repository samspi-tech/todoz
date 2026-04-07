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

interface TasksListCardProps {
    cardDetails: TasksListType;
}

const TasksListCard = ({ cardDetails }: TasksListCardProps) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isActiveAnchor, setIsActiveAnchor] = useState(false);

    const navigate = useNavigate();
    const { dialogRef, handleOpenPopover } = useModal();
    const { selectedCardTitle, setSelectedCardTitle } =
        useSelectedButtonAnchorContext();

    const { id, title } = cardDetails;

    useEffect(() => {
        if (selectedCardTitle === title) {
            setIsActiveAnchor(true);
        } else {
            setIsActiveAnchor(false);
        }
    }, [selectedCardTitle]);

    return (
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

                <Popover ref={dialogRef}>
                    <OptionsDropdownMenu />
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
    );
};

export default TasksListCard;
