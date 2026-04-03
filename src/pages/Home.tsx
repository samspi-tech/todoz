import { useEffect } from 'react';
import { type RouterNavigateOptions, useNavigate } from 'react-router';

import Welcome from '@/components/welcome/Welcome.tsx';

import { useTaskListsContext } from '@/hooks/useTaskListsContext.ts';

const Home = () => {
    const navigate = useNavigate();
    const { taskLists, getAllTaskLists, hasDataLoaded } = useTaskListsContext();

    useEffect(() => {
        getAllTaskLists();

        if (hasDataLoaded && taskLists.length > 0) {
            const options: RouterNavigateOptions = {
                replace: true,
                viewTransition: true,
            };

            navigate('/tasks', options);
        }
    }, [hasDataLoaded]);

    return <Welcome />;
};

export default Home;
