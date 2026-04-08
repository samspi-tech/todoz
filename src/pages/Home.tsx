import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import Welcome from '@/components/welcome/Welcome.tsx';

import { useListContext } from '@/hooks/useListContext.ts';
import { routerOptions } from '@/react-router/options.ts';

const Home = () => {
    const navigate = useNavigate();
    const { lists, getAllLists, hasDataLoaded } = useListContext();

    useEffect(() => {
        getAllLists();

        if (hasDataLoaded && lists.length > 0) {
            navigate('/lists', routerOptions);
        }
    }, [hasDataLoaded]);

    return <Welcome />;
};

export default Home;
