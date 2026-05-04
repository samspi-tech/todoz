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
import { getDateTasksReset } from '@/utils/helpers.ts';

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

    const { id, title, daysReset, dateUpdated } = cardDetails;

    const dateTasksReset = getDateTasksReset(dateUpdated!, Number(daysReset));

    const daysLeftTasksReset =
        dateTasksReset.getUTCDate() - new Date().getUTCDate();

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

        const currentDate = new Date().setHours(0, 0, 0, 0);
        const isResetDay = currentDate >= dateTasksReset.setHours(0, 0, 0, 0);

        if (isResetDay) {
            const payload = {
                ...cardDetails,
                dateUpdated: new Date(),
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
                            Next reset{' '}
                            {daysLeftTasksReset > 1
                                ? `in ${daysLeftTasksReset} days`
                                : 'tomorrow'}
                            .
                        </p>
                    </footer>
                )}
            </article>

            <Popover ref={popoverRef}>
                <OptionsDropdownMenu
                    onEdit={() => {
                        handleOpenModal();
                        setNewList(cardDetails);
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
