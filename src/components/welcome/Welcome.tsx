import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

import Button from '@/components/button/Button.tsx';

import styles from './Welcome.module.css';
import lightLogo from '@/assets/light-logo.svg';
import darkLogo from '@/assets/dark-logo.svg';
import illustration from '@/assets/unsplash-irvan-maulana-illustration.jpg';
import { routerOptions } from '@/react-router/options.ts';
import { useThemeContext } from '@/hooks/useThemeContext.ts';

const Welcome = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useThemeContext();

    const handleNavigateToTasksPage = () => {
        navigate('/lists', routerOptions);
    };

    const logo = isDarkMode ? darkLogo : lightLogo;

    return (
        <header className={styles.header}>
            <hgroup>
                <h1>
                    <img src={logo} alt="ToDoz logo" />
                    <span>ToDoz</span>
                </h1>
                <p>Create your personalized task lists</p>
            </hgroup>

            <div className={styles.illustrationContainer}>
                <img
                    src={illustration}
                    alt="Illustration by Irvan maulana on Unsplash"
                />
            </div>

            <Button onClick={handleNavigateToTasksPage}>
                <span>begin</span>
                <ArrowRight />
            </Button>
        </header>
    );
};

export default Welcome;
