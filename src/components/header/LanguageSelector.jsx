import { ReactCountryFlag } from "react-country-flag";

export const LanguageSelector = ({language, setLanguage}) => {
    const changeLanguage = (targetLanguage) => {
        if (language !== targetLanguage) {
            setLanguage(targetLanguage);
        }
    }

    return (
        <div className="emoji-flag-wrapper">
            <span className="m-2 px-1">
                <ReactCountryFlag
                className="emoji-flag"
                countryCode={language === "EN" ? "GR" : "GB"}
                aria-label={language === "EN" ? "Greek" : "English"}
                title={language === "EN" ? "Greek" : "English"}
                alt={language === "EN" ? "Greek" : "English"}
                svg
                onClick={() => changeLanguage(language === "EN" ? "GR" : "EN")}
                />
            </span>
        </div>
    )
}
