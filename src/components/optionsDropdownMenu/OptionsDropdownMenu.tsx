import { SquarePen, Trash2 } from 'lucide-react';

import styles from './OptionsDropdownMenu.module.css';

const OptionsDropdownMenu = () => {
    return (
        <ul className={styles.dropdownMenu}>
            <li>
                <SquarePen />
                <span>Edit</span>
            </li>
            <li>
                <Trash2 />
                <span>Delete</span>
            </li>
        </ul>
    );
};

export default OptionsDropdownMenu;
