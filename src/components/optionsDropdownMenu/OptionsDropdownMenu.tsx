import { SquarePen, Trash2 } from 'lucide-react';

import styles from './OptionsDropdownMenu.module.css';
import { useTranslation } from 'react-i18next';

interface OptionsDropdownMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

const OptionsDropdownMenu = ({
    onEdit,
    onDelete,
}: OptionsDropdownMenuProps) => {
    const { t } = useTranslation();

    return (
        <ul className={styles.dropdownMenu}>
            <li>
                <button onClick={onEdit}>
                    <SquarePen />
                    <span>{t('edit', 'Edit')}</span>
                </button>
            </li>
            <li>
                <button onClick={onDelete}>
                    <Trash2 />
                    <span>{t('delete', 'Delete')}</span>
                </button>
            </li>
        </ul>
    );
};

export default OptionsDropdownMenu;
