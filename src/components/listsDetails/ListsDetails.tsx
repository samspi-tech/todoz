import { Plus } from 'lucide-react';
import { useEffect } from 'react';

import Button from '@/components/button/Button.tsx';
import Modal from '@/components/modal/Modal.tsx';
import ListForm from '@/components/listForm/ListForm.tsx';
import Empty from '@/components/empty/Empty.tsx';
import ListCard from '@/components/listCard/ListCard.tsx';

import styles from './ListsDetails.module.css';
import { useModal } from '@/hooks/useModal.ts';
import { useListContext } from '@/hooks/useListContext.ts';

const ListsDetails = () => {
    const { modalRef, handleOpenModal, handleCloseModal } = useModal();

    const { lists, getAllLists, setError, setNewList, initialValues } =
        useListContext();

    useEffect(() => {
        getAllLists();
    }, []);

    return (
        <section className={styles.taskListsContainer}>
            {!lists.length && (
                <>
                    <h2>Add a new list</h2>
                    <Empty />
                </>
            )}

            {lists.length > 0 && (
                <>
                    <h2>Your lists</h2>
                    <div className={styles.cardsContainer}>
                        {lists.map((list) => (
                            <ListCard key={list.id} cardDetails={list} />
                        ))}
                    </div>
                </>
            )}

            <div className={styles.addButtonContainer}>
                <Button
                    variant="square"
                    aria-label="Add new list"
                    onClick={() => {
                        handleOpenModal();
                        setNewList(initialValues);
                    }}
                >
                    <Plus />
                </Button>
            </div>

            <Modal
                ref={modalRef}
                title="Create list"
                onClose={() => {
                    setError(null);
                    handleCloseModal();
                }}
            >
                <ListForm />
            </Modal>
        </section>
    );
};

export default ListsDetails;
