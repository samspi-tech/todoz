import {
    type Dispatch,
    type PropsWithChildren,
    type RefObject,
    type SetStateAction,
    useEffect,
} from 'react';
import { X } from 'lucide-react';

import Button from '@/components/button/Button.tsx';

import styles from './Modal.module.css';

interface ModalProps {
    title: string;
    onClose: () => void;
    ref: RefObject<HTMLDialogElement | null>;
    timer?: number;
    setTimer?: Dispatch<SetStateAction<number>>;
}

const Modal = ({
    title,
    onClose,
    ref,
    children,
    timer = 0,
    setTimer,
}: PropsWithChildren<ModalProps>) => {
    useEffect(() => {
        if (!setTimer || timer <= 0) {
            return;
        }

        const intervalId = setInterval(() => {
            setTimer((prevState) => prevState - 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [timer > 0]);

    return (
        <dialog ref={ref} className={styles.modal}>
            <header>
                <h2>{title}</h2>

                <Button
                    size="small"
                    variant="unstyled"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <X />
                </Button>
            </header>
            {children}
        </dialog>
    );
};

export default Modal;
