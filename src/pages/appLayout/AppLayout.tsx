import { Outlet } from 'react-router';

import Navbar from '@/components/navbar/Navbar.tsx';

import styles from './AppLayout.module.css';

const AppLayout = () => {
    return (
        <div className={styles.appLayout}>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
