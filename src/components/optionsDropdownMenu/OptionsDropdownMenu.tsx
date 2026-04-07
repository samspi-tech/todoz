import { SquarePen, Trash2 } from 'lucide-react';

import styles from './OptionsDropdownMenu.module.css';

interface OptionsDropdownMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

const OptionsDropdownMenu = ({
    onEdit,
    onDelete,
}: OptionsDropdownMenuProps) => {
    return (
        <ul className={styles.dropdownMenu}>
            <li>
                <button onClick={onEdit}>
                    <SquarePen />
                    <span>Edit</span>
                </button>
            </li>
            <li>
                <button onClick={onDelete}>
                    <Trash2 />
                    <span>Delete</span>
                </button>
            </li>
        </ul>
    );
};

export default OptionsDropdownMenu;
