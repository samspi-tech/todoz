import { useRef, useState } from 'react';

export const useModal = () => {
    const [timer, setTimer] = useState(0);

    const modalRef = useRef<HTMLDialogElement>(null);
    const popoverRef = useRef<HTMLDialogElement>(null);

    const handleOpenModal = () => {
        const currModal = modalRef.current;

        if (!currModal) {
            return;
        }

        currModal.showModal();
    };

    const handleOpenPopover = () => {
        const currPopover = popoverRef.current;

        if (!currPopover) {
            return;
        }

        currPopover.showPopover();
    };

    const handleCloseModal = () => {
        const currModal = modalRef.current;

        if (!currModal) {
            return;
        }

        currModal.close();
    };

    return {
        modalRef,
        popoverRef,
        handleOpenModal,
        handleCloseModal,
        handleOpenPopover,
        timer,
        setTimer,
    };
};
