import { useRef, useState } from 'react';

export const useModal = () => {
    const [timer, setTimer] = useState(0);

    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleOpenModal = () => {
        const currDialog = dialogRef.current;

        if (!currDialog) {
            return;
        }

        currDialog.showModal();
    };

    const handleOpenPopover = () => {
        const currDialog = dialogRef.current;

        if (!currDialog) {
            return;
        }

        currDialog.showPopover();
    };

    const handleCloseModal = () => {
        const currDialog = dialogRef.current;

        if (!currDialog) {
            return;
        }

        currDialog.close();
    };

    return {
        dialogRef,
        handleOpenModal,
        handleCloseModal,
        handleOpenPopover,
        timer,
        setTimer,
    };
};
