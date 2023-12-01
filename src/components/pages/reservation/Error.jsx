import PropTypes from "prop-types";

import { FaRegWindowClose } from "react-icons/fa";

export const Error = ({
    language, errorDescription,
    errorMessage, setErrorMessage
}) => {
    const isErrorMessage = Object.keys(errorMessage).length > 0;
    const isErrorDescription = errorDescription.length > 0;

    return (
        isErrorMessage &&
        <div id="seat-error-message">
            <div className="alert alert-danger my-0" role="alert">
                <div className="d-flex flex-row">
                    <span className="me-2">
                        {errorMessage[language]}
                    </span>
                    <span
                        id="close-seat-error-message"
                        className="ms-2"
                        onClick={() => setErrorMessage({})}
                    >
                        <FaRegWindowClose />
                    </span>
                </div>
                {isErrorDescription && <>
                    <hr></hr>
                    <div className="d-flex flex-column">
                        {errorDescription.map(element => {
                            if (element?.header) {
                                return <span key="seat-error-header" className="fw-bold">
                                    {element?.header[language]}
                                </span>;
                            }
                            else {
                                return <span key={`seat-error-trip-${element?.tripId}`}>
                                    {element?.startStation[language]} - {element?.arrivalStation[language]}:
                                    &nbsp;{element?.noOfSeats}
                                </span>;
                            }
                        })}
                    </div>
                </>}
            </div>
        </div>
  );
};

Error.propTypes = {
    language: PropTypes.string.isRequired,
    errorDescription: PropTypes.array.isRequired,
    errorMessage: PropTypes.object.isRequired,
    setErrorMessage: PropTypes.func.isRequired
};
