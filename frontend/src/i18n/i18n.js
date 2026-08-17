import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ro from "./locales/ro.json";

const savedLanguage = localStorage.getItem("interviewhub-language");

const browserLanguage = navigator.language
    ?.toLowerCase()
    .startsWith("ro")
    ? "ro"
    : "en";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },
            ro: {
                translation: ro
            }
        },

        lng: savedLanguage || browserLanguage,
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;