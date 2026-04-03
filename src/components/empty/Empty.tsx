import illustration from '@/assets/unsplash-alghozy-illustration.png';
import styles from './Empty.module.css';

const Empty = () => {
    return (
        <div className={styles.emptyContainer}>
            <div className={styles.imageContainer}>
                <img
                    src={illustration}
                    alt="Illustration by Alghozy on Unsplash"
                />
            </div>
        </div>
    );
};

export default Empty;
