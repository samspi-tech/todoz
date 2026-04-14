import { type ComponentProps, type PropsWithChildren, useState } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
    size?: 'small';
    isAnchor?: boolean;
    variant?: 'primary' | 'square' | 'danger' | 'unstyled';
}

const Button = ({
    variant = 'primary',
    size,
    isAnchor = false,
    ...rest
}: PropsWithChildren<ButtonProps>) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <button
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            className={`${styles.button} ${styles[variant]} ${size && styles[size]} ${isPressed && styles.pressed} ${isAnchor && styles.anchor}`}
            {...rest}
        />
    );
};

export default Button;
