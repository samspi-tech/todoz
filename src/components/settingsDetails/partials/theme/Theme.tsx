import { SunMoon } from 'lucide-react';

import OptionContainer from '@/components/settingsDetails/partials/option/OptionContainer.tsx';

const Theme = () => {
    return (
        <OptionContainer icon={<SunMoon />} label="Theme">
            <p>Change color theme</p>
        </OptionContainer>
    );
};

export default Theme;
