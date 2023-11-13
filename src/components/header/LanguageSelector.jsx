import { ReactCountryFlag } from "react-country-flag";

export const LanguageSelector = ({language, setLanguage}) => {
    const changeLanguage = (targetLanguage) => {
        if (language !== targetLanguage) {
            setLanguage(targetLanguage);
        }
    }

    return (
        <div className="emoji-flag-wrapper">
            <span className="ms-2 px-1">
                <ReactCountryFlag
                className="emoji-flag"
                countryCode="GR"
                aria-label="Greek"
                title="Greek"
                alt="Greek"
                svg
                onClick={() => changeLanguage("GR")}
                />
            </span>
            <span className="ms-2 px-1 me-2">
                <ReactCountryFlag
                className="emoji-flag"
                countryCode="GB"
                aria-label="English"
                title="English"
                alt="English"
                svg
                onClick={() => changeLanguage("EN")}
                />
            </span>
        </div>
    )
}
