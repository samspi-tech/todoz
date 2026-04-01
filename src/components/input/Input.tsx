import type { ComponentProps } from 'react';

import styles from './Input.module.css';

interface InputProps extends ComponentProps<'input'> {
    id: string;
    label: string;
}

const Input = ({ id, label, ...rest }: InputProps) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} {...rest} />
        </div>
    );
};

export default Input;
