import { useTranslation } from 'react-i18next';

import illustration from '@/assets/unsplash-alghozy-illustration.png';
import styles from './Empty.module.css';

const Empty = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.emptyContainer}>
            <div className={styles.imageContainer}>
                <img
                    src={illustration}
                    alt={t(
                        'illustrationByAlghozyOnUnsplash',
                        'Illustration by Alghozy on Unsplash'
                    )}
                />
            </div>
        </div>
    );
};

export default Empty;
