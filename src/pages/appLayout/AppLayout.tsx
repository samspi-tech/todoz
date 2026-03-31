import { Outlet } from 'react-router';

import styles from './AppLayout.module.css';

const AppLayout = () => {
    return (
        <div className={styles.appLayout}>
            <nav>navigation</nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
