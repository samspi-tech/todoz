import { ChevronDown } from 'lucide-react';
import { type PropsWithChildren, type ReactNode, useState } from 'react';

import styles from './OptionContainer.module.css';

interface OptionProps {
    label: string;
    icon: ReactNode;
}

const OptionContainer = ({
    label,
    icon,
    children,
}: PropsWithChildren<OptionProps>) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleOptionVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    return (
        <article>
            <button
                onClick={handleOptionVisibility}
                className={styles.optionLabel}
            >
                <p>
                    {icon}
                    <span>{label}</span>
                </p>

                <ChevronDown
                    className={`${isVisible ? styles.chevronUp : styles.chevronDown}`}
                />
            </button>

            <div
                className={`${styles.optionBody} ${isVisible ? styles.show : styles.hide}`}
            >
                {isVisible && (
                    <div className={styles.optionContent}>{children}</div>
                )}
            </div>
        </article>
    );
};

export default OptionContainer;
