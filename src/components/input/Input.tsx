import type { ComponentProps } from 'react';

import styles from './Input.module.css';

interface InputProps extends ComponentProps<'input'> {
    id: string;
    label: string;
    error?: string | null;
}

const Input = ({ id, label, error, ...rest }: InputProps) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} {...rest} />
            {error && <small className={styles.errorMessage}>{error}</small>}
        </div>
    );
};

export default Input;
