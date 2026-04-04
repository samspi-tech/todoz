import { type PropsWithChildren, type RefObject } from 'react';

import styles from './Popover.module.css';

interface PopoverProps {
    ref: RefObject<HTMLDialogElement | null>;
}

const Popover = ({ ref, children }: PropsWithChildren<PopoverProps>) => {
    return (
        <dialog className={styles.popover} ref={ref} popover="auto">
            {children}
        </dialog>
    );
};

export default Popover;
