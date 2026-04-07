import { SquarePen, Trash2 } from 'lucide-react';

import styles from './OptionsDropdownMenu.module.css';

interface OptionsDropdownMenuProps {
    onDelete: () => void;
}

const OptionsDropdownMenu = ({ onDelete }: OptionsDropdownMenuProps) => {
    return (
        <ul className={styles.dropdownMenu}>
            <li>
                <button>
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
