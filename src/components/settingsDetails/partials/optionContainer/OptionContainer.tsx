import { ChevronDown } from 'lucide-react';
import {
    type PropsWithChildren,
    type ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';

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
    const panelRef = useRef<HTMLDivElement>(null);

    const [isVisible, setIsVisible] = useState(false);

    const handleOptionVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    useEffect(() => {
        const panel = panelRef.current;

        if (!panel) {
            return;
        }

        if (isVisible) {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        } else {
            panel.style.maxHeight = '0';
        }
    }, [isVisible]);

    return (
        <article>
            <button
                className={styles.optionLabel}
                onClick={handleOptionVisibility}
            >
                <p>
                    {icon}
                    <span>{label}</span>
                </p>

                <ChevronDown
                    className={`${isVisible ? styles.chevronUp : styles.chevronDown}`}
                />
            </button>

            <div ref={panelRef} className={styles.optionPanel}>
                {children}
            </div>
        </article>
    );
};

export default OptionContainer;
