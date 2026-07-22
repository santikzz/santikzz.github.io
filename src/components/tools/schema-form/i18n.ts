import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const schemaForm = {
    password_strength: {
        min_8_chars: "At least 8 characters",
        one_number: "At least one number",
        one_lowercase: "At least one lowercase letter",
        one_uppercase: "At least one uppercase letter",
        one_special_char: "At least one special character",
        show_password: "Show password",
        hide_password: "Hide password",
    },
};

// registered both as a namespace (schema_form:key) and as a nested key
// (schema_form.key) because the fields use both syntaxes
if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
        lng: "en",
        fallbackLng: "en",
        interpolation: { escapeValue: false },
        resources: {
            en: {
                translation: { schema_form: schemaForm },
                schema_form: schemaForm,
            },
        },
    });
}

export default i18n;
