import type { PropsWithChildren, RefObject } from 'react';
import { X } from 'lucide-react';

import Button from '@/components/button/Button.tsx';

import styles from './Modal.module.css';

interface ModalProps {
    title: string;
    onClose: () => void;
    ref: RefObject<HTMLDialogElement | null>;
}

const Modal = ({
    title,
    onClose,
    ref,
    children,
}: PropsWithChildren<ModalProps>) => {
    return (
        <dialog ref={ref} className={styles.modal}>
            <header>
                <h2>{title}</h2>
                <Button size="small" variant="rounded" onClick={onClose}>
                    <X />
                </Button>
            </header>
            {children}
        </dialog>
    );
};

export default Modal;
