import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import Popover from '@/components/popover/Popover.tsx';
import Button from '@/components/button/Button.tsx';
import OptionsDropdownMenu from '@/components/optionsDropdownMenu/OptionsDropdownMenu.tsx';
import ListForm from '@/components/listForm/ListForm.tsx';
import Modal from '@/components/modal/Modal.tsx';

import styles from './ListCard.module.css';
import type { List } from '@/types/types.ts';
import { useModal } from '@/hooks/useModal.ts';
import { useSelectedCardContext } from '@/hooks/useSelectedCardContext.ts';
import { useListContext } from '@/hooks/useListContext.ts';
import { useTaskContext } from '@/hooks/useTaskContext.ts';

interface ListCardProps {
    cardDetails: List;
}

const ListCard = ({ cardDetails }: ListCardProps) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isActiveAnchor, setIsActiveAnchor] = useState(false);

    const navigate = useNavigate();
    const { resetTasks } = useTaskContext();
    const { cardTitle, setCardTitle } = useSelectedCardContext();

    const { deleteList, setError, setNewList, initialValues, updateList } =
        useListContext();

    const {
        popoverRef,
        handleOpenPopover,
        modalRef,
        handleOpenModal,
        handleCloseModal,
    } = useModal();

    const { id, title, daysReset, dateCreated } = cardDetails;

    useEffect(() => {
        if (cardTitle === title) {
            setIsActiveAnchor(true);
        } else {
            setIsActiveAnchor(false);
        }
    }, [cardTitle]);

    useEffect(() => {
        if (!daysReset) {
            return;
        }

        const currentDate = new Date();
        const listDateCreated = new Date(dateCreated!);

        const listDateReset = listDateCreated.setDate(
            listDateCreated.getDate() + Number(daysReset)
        );

        const dayToResetTask = new Date(listDateReset);

        const isResetDay =
            currentDate.setHours(0, 0, 0, 0) ===
            dayToResetTask.setHours(0, 0, 0, 0);

        if (isResetDay) {
            const payload = {
                ...cardDetails,
                dateCreated: currentDate,
            };

            resetTasks(id);
            updateList(id, payload);
        }
    }, []);

    return (
        <>
            <article className={styles.card}>
                <div>
                    <div
                        className={`${styles.cardBody} ${isPressed && styles.pressed}`}
                        onTouchStart={() => setIsPressed(true)}
                        onTouchEnd={() => setIsPressed(false)}
                        onClick={() =>
                            navigate(`/lists/${id}`, { viewTransition: true })
                        }
                    >
                        <h3>{title}</h3>
                    </div>

                    <Button
                        size="small"
                        variant="unstyled"
                        isAnchor={isActiveAnchor}
                        onClick={() => {
                            handleOpenPopover();
                            setCardTitle(title);
                        }}
                    >
                        <EllipsisVertical />
                    </Button>
                </div>

                {daysReset && (
                    <footer>
                        <p>
                            All tasks will reset every{' '}
                            {Number(daysReset) > 1
                                ? `${daysReset} days`
                                : 'day'}
                            .
                        </p>
                    </footer>
                )}
            </article>

            <Popover ref={popoverRef}>
                <OptionsDropdownMenu
                    onEdit={() => {
                        handleOpenModal();
                        setNewList({ id, title, daysReset });
                    }}
                    onDelete={() => deleteList(id)}
                />
            </Popover>

            <Modal
                ref={modalRef}
                title="Edit list"
                onClose={() => {
                    setError(null);
                    handleCloseModal();
                    setNewList(initialValues);
                }}
            >
                <ListForm isUpdate editListId={id} onClose={handleCloseModal} />
            </Modal>
        </>
    );
};

export default ListCard;
