import type { ComponentProps } from 'react';

import styles from './Checkbox.module.css';
import stylesCheckbox from '@/components/taskCard/partials/TaskCheckbox.module.css';

interface CheckboxProps extends ComponentProps<'input'> {
    name: string;
    label: string;
}

const Checkbox = ({ name, label, ...rest }: CheckboxProps) => {
    return (
        <label className={styles.checkboxInputContainer}>
            <input
                name={name}
                type="checkbox"
                className={stylesCheckbox.checkbox}
                {...rest}
            />
            {label}
        </label>
    );
};

export default Checkbox;
