import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n.use(initReactI18next)
    .use(
        resourcesToBackend(
            (language: string, namespace: string) =>
                import(`../public/locales/${language}/${namespace}.json`)
        )
    )
    .init({
        lng: localStorage.getItem('i18nextLng') || 'en',
        returnEmptyString: false,
        defaultNS: 'translation',
    });

export default i18n;
