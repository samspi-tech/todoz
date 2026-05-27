import { Languages } from 'lucide-react';

import OptionContainer from '@/components/settingsDetails/partials/optionContainer/OptionContainer.tsx';

import styles from '../theme/Theme.module.css';

const Language = () => {
    return (
        <OptionContainer label="Language" icon={<Languages />}>
            <ul className={styles.container}>
                <li>English</li>
                <li>Italian</li>
            </ul>
        </OptionContainer>
    );
};

export default Language;
