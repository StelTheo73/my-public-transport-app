import PropTypes from "prop-types";
import countries from "../../../assets/language/countries.json";

export const ContactForm = ({language, textObject}) => {
    return (
        <div className="container-fluid passenger-contact-wrapper p-3">
            <div className="row">
                <div className="col-12 col-sm-6 mt-1">
                    <label
                    className="form-label required"
                    htmlFor="contact-name"
                    >{textObject.contactName[language]}
                    </label>
                    <input
                    id="contact-name"
                    className="form-control required"
                    required
                    type="text"
                    autoFocus={true}
                    autoComplete="name"
                    ></input>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-sm-6 mt-1">
                    <label
                        className="form-label required"
                        htmlFor="contactEmail"
                    >{textObject.contactEmail[language]}
                    </label>
                    <input
                        id="contactEmail"
                        className="form-control required"
                        required
                        type="email"
                        // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                        autoComplete="email"
                    />
                </div>

                <div className="col-12 col-sm-6 mt-1">
                    <label
                        className="form-label required"
                        htmlFor="contactPhone"
                    >{textObject.contactPhone[language]}
                    </label>
                    <input
                        id="contactPhone"
                        className="form-control required"
                        required
                        type="tel"
                        pattern="[0-9]{10}"
                        autoComplete="tel"
                    ></input>
                </div>
            </div>

            <div className="row">
            <div className="col-12 col-sm-6 mt-1">
                <label
                    className="form-label required"
                    htmlFor="contactAddress"
                >{textObject.contactAddress[language]}
                </label>
                <input
                    id="contactAddress"
                    className="form-control required"
                    required
                    type="text"
                    autoComplete="address"
                ></input>
            </div>

            <div className="col-12 col-sm-6 mt-1">
                <label
                    className="form-label required"
                    htmlFor="contactCity"
                >{textObject.contactCity[language]}
                </label>
                <input
                    id="contactCity"
                    className="form-control required"
                    required
                    type="text"
                    autoComplete="address-level2"
                ></input>
            </div>
        </div>

        <div className="row">
            <div className="col-12 col-sm-6 mt-1">
            <label
                className="form-label required"
                htmlFor="contactPostalCode"
            >{textObject.contactZip[language]}
            </label>
            <input
                id="contactPostalCode"
                className="form-control required"
                required
                type="text"
                autoComplete="postal-code"
                ></input>
            </div>

            <div className="col-12 col-sm-6 mt-1">
            <label
                className="form-label required"
                htmlFor="contactCountry"
                >{textObject.contactCountry[language]}
            </label>
            <select
                id="contactCountry"
                className="form-control required"
                required
                autoComplete="country-name"
                >
                {countries[language].map(i=>
                        <option key={`country-option-${countries.EN}`}>{i}</option>
                )}
                </select>
            {/* <Select value={"countries[language][0]"}
                options={countries[language].map(country=> {return { value: country, label: country }})} /> */}
            </div>
        </div>

    </div>
    );
};

ContactForm.propTypes = {
    language: PropTypes.string.isRequired,
    textObject: PropTypes.object.isRequired
}
