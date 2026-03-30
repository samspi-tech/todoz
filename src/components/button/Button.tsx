import type { ComponentProps, PropsWithChildren } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
    size?: 'small';
    variant?: 'primary' | 'rounded';
}

const Button = ({
    variant = 'primary',
    size,
    ...rest
}: PropsWithChildren<ButtonProps>) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${size && styles[size]}`}
            {...rest}
        />
    );
};

export default Button;
