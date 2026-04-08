import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import Welcome from '@/components/welcome/Welcome.tsx';

import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';
import { routerOptions } from '@/react-router/options.ts';

const Home = () => {
    const navigate = useNavigate();
    const { taskLists, getAllTaskLists, hasDataLoaded } = useTaskListsContext();

    useEffect(() => {
        getAllTaskLists();

        if (hasDataLoaded && taskLists.length > 0) {
            navigate('/lists', routerOptions);
        }
    }, [hasDataLoaded]);

    return <Welcome />;
};

export default Home;
