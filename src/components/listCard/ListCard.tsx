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

interface ListCardProps {
    cardDetails: List;
}

const ListCard = ({ cardDetails }: ListCardProps) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isActiveAnchor, setIsActiveAnchor] = useState(false);

    const navigate = useNavigate();
    const { cardTitle, setCardTitle } = useSelectedCardContext();

    const { deleteList, setError, setNewList, initialValues } =
        useListContext();

    const {
        popoverRef,
        handleOpenPopover,
        modalRef,
        handleOpenModal,
        handleCloseModal,
    } = useModal();

    const { id, title } = cardDetails;

    useEffect(() => {
        if (cardTitle === title) {
            setIsActiveAnchor(true);
        } else {
            setIsActiveAnchor(false);
        }
    }, [cardTitle]);

    return (
        <>
            <article className={styles.card}>
                <>
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

                    <Popover ref={popoverRef}>
                        <OptionsDropdownMenu
                            onEdit={() => {
                                handleOpenModal();
                                setNewList(initialValues);
                            }}
                            onDelete={() => deleteList(id)}
                        />
                    </Popover>
                </>

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
            </article>

            <Modal
                ref={modalRef}
                title="Edit list"
                onClose={() => {
                    setError(null);
                    handleCloseModal();
                }}
            >
                <ListForm isUpdate editListId={id} onClose={handleCloseModal} />
            </Modal>
        </>
    );
};

export default ListCard;
