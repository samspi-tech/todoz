import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

import Button from '@/components/button/Button.tsx';

import styles from './Welcome.module.css';
import lightLogo from '@/assets/light-logo.svg';
import illustration from '@/assets/unsplash-irvan-maulana-illustration.jpg';
import { routerOptions } from '@/react-router/options.ts';

const Welcome = () => {
    const navigate = useNavigate();

    const handleNavigateToTasksPage = () => {
        navigate('/lists', routerOptions);
    };

    return (
        <header className={styles.header}>
            <hgroup>
                <h1>
                    <img src={lightLogo} alt="ToDoz logo" />
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
