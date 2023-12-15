import PropTypes from "prop-types";

import { FaRegWindowClose } from "react-icons/fa";

import "./ErrorPopup.css";

export const ErrorPopup = ({
    language,
    errorMessage, setErrorMessage
}) => {
    const isErrorMessage = Object.keys(errorMessage).length > 0;
    return (
        isErrorMessage &&
        <div id="trip-error-message">
            <div className="alert alert-danger my-0" role="alert">
                <div className="d-flex flex-row">
                    <span className="me-2">
                        {errorMessage[language]}
                    </span>
                    <span
                        id="close-trip-error-message"
                        className="ms-2"
                        onClick={() => setErrorMessage({})}
                    >
                        <FaRegWindowClose />
                    </span>
                </div>
            </div>
        </div>
  );
};

Error.propTypes = {
    language: PropTypes.string.isRequired,
    errorMessage: PropTypes.object.isRequired,
    setErrorMessage: PropTypes.func.isRequired
};
