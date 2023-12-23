import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import countries from "../../../assets/language/countries.json";
import textObject from "../../../assets/language/contactForm.json";
import termsAndConditions_EN from "../../../static/pdf/termsAndConditions_EN.pdf";
import termsAndConditions_GR from "../../../static/pdf/termsAndConditions_GR.pdf";
import privacyPolicy_EN from "../../../static/pdf/privacyPolicy_EN.pdf";
import privacyPolicy_GR from "../../../static/pdf/privacyPolicy_GR.pdf";

const ValidationFields = ({validId, invalidId, text}) => {
    return (
      <>
        <div
          id={validId}
          className="valid-feedback">
            <FaHeart className="text-success"/>
        </div>
        <div
          id={invalidId}
          className="invalid-feedback">
          {text}
        </div>
      </>
    );
};

export const ContactForm = ({language, nameFieldRef}) => {
    const renderCheckBoxContent = () => {
        return (
            <span>
                {textObject.contactAgreement.text1[language]}
                <a
                    href={language === "EN" ? termsAndConditions_EN : termsAndConditions_GR}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={-1}
                >
                    {textObject.contactAgreement.termsAndConditions[language]}
                </a>
                {textObject.contactAgreement.text2[language]}
                <a
                    href={language === "EN" ? privacyPolicy_EN : privacyPolicy_GR}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={-1}
                >
                    {textObject.contactAgreement.privacyPolicy[language]}
                </a>
            </span>
        );
    };

    return (
        <div className="container-fluid passenger-contact-wrapper contact-form p-3 w-75">
            <div className="row">
                <div className="col-12 col-sm-6 mt-1">
                    <label
                        className="form-label required"
                        htmlFor="contactName"
                    >{textObject.contactName[language]}
                    </label>
                    <input
                        id="contactName"
                        className="form-control required"
                        required
                        type="text"
                        autoFocus={true}
                        autoComplete="name"
                        ref={nameFieldRef || null}
                    ></input>

                    <ValidationFields
                        validId="contact-name-valid"
                        invalidId="contact-name-invalid"
                        text={textObject.formValidation.name[language]}
                    />
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

                    <ValidationFields
                        validId="contactEmail-valid"
                        invalidId="contactEmail-invalid"
                        text={textObject.formValidation.email[language]}
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

                    <ValidationFields
                        validId="contactPhone-valid"
                        invalidId="contactPhone-invalid"
                        text={textObject.formValidation.phone[language]}
                    />
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

                <ValidationFields
                    validId="contactAddress-valid"
                    invalidId="contactAddress-invalid"
                    text={textObject.formValidation.address[language]}
                />
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

                <ValidationFields
                    validId="contactCity-valid"
                    invalidId="contactCity-invalid"
                    text={textObject.formValidation.city[language]}
                />
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

            <ValidationFields
                validId="contactPostalCode-valid"
                invalidId="contactPostalCode-invalid"
                text={textObject.formValidation.zip[language]}
            />
            </div>

            <div className="col-12 col-sm-6 mt-1">
            <label
                className="form-label required"
                htmlFor="contactCountry"
                >{textObject.contactCountry[language]}
            </label>
            <select
                id="contactCountry"
                className="form-select required"
                required
                autoComplete="country-name"
                >
                {countries[language].map(i =>
                    <option kew={countries[language].indexOf(i)}>{i}</option>
                )}
                </select>

                {/* <ValidationFields
                    validId="contactCountry-valid"
                    invalidId="contactCountry-invalid"
                    text={textObject.formValidation.country[language]}
                /> */}
            {/* <Select value={"countries[language][0]"}
                options={countries[language].map(country=> {return { value: country, label: country }})} /> */}
            </div>
        </div>

        <div className="row mt-2">
            {/* Add a checkbox for the user to accept terms of service and privacy policy */}
            <div className="col-12 col-sm-6 mt-1">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="contactAgreement"
                        required
                        />
                    <label
                        className="form-check-label required"
                        htmlFor="contactAgreement"
                    >{renderCheckBoxContent()}
                    </label>

                    <ValidationFields
                        validId="contactAgreement-valid"
                        invalidId="contactAgreement-invalid"
                        text={textObject.formValidation.agreement[language]}
                    />
                </div>
            </div>

        </div>

    </div>
    );
};

ContactForm.propTypes = {
    language: PropTypes.string.isRequired,
    nameFieldRef: PropTypes.object
};

ValidationFields.propTypes = {
    validId: PropTypes.string.isRequired,
    invalidId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};
