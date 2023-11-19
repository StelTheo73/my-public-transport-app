import PropTypes from "prop-types";
import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaTrain, FaFlagCheckered, FaSearch,
    FaArrowRight, FaArrowLeft,
    FaRegClock, FaEuroSign, FaInfoCircle,
} from "react-icons/fa";
import { MdAirlineSeatReclineExtra } from "react-icons/md";

import { Trip } from "./Trip.jsx";

import { useFetch } from "../../../hooks/useFetch.jsx";

import "./Trips.css";

import textObject from "../../../assets/language/trips.json";
import errorText from "../../../assets/language/error.json";

import { disableElement, enableElement } from "../../../utils/commonFunctionsDOM.js";
import { ErrorAlert } from "../../ErrorAlert.jsx";

import { DEFAULT_TRANSITION_TIMEOUT } from "../../../env/constants.js";

const TRANSITION_TIMEOUT = 300;

export const Trips = ({
        language, searchParameters, stations,
        selectedTrip, setSelectedTrip,
        selectedReturnTrip, setSelectedReturnTrip
    }) => {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [returnUrl, setReturnUrl] = useState("");
    const [hide, setHide] = useState(false);
    const [showReturnTrips, setShowReturnTrips] = useState(false);
    const { data: trips, loading, error } = useFetch(url);
    const { data: returnTrips, loading: returnLoading, error: returnError } = useFetch(returnUrl);

    const [alert, setAlert] = useState(false);

    // Navigate to home page is search has not been performed
    useEffect(() => {
        if (!searchParameters?.start || !searchParameters?.destination ||
            !searchParameters?.date || !searchParameters?.returnDate ||
            !searchParameters?.tripType ||
            !searchParameters?.start.english || !searchParameters?.destination.english) {
            navigate("/");
            return undefined;
        }


        setUrl("/fetch/trips/" +
            searchParameters.start.english + searchParameters.destination.english);

        if (searchParameters?.tripType?.value === "returningTrip") {
            setReturnUrl("/fetch/trips/" +
                searchParameters.destination.english + searchParameters.start.english);
        }

    }, [navigate, searchParameters]);

    useEffect(() => {
        if (!selectedTrip?.tripId) {
            disableElement("reservation-btn");
        }
        else if (!selectedReturnTrip?.tripId &&
                searchParameters?.tripType?.value === "returningTrip") {
            disableElement("reservation-btn");
        }
        else {
            enableElement("reservation-btn");
        }


    }, [selectedTrip, selectedReturnTrip, searchParameters?.tripType?.value])

    const tripsTransition = (tripsToShow) => {
        if (tripsToShow === "trips" && showReturnTrips === true) {
            setHide(true);
            setShowReturnTrips(false);
            setTimeout(() => {
                setHide(false);
            }, DEFAULT_TRANSITION_TIMEOUT);
        }
        else if (tripsToShow === "returnTrips" && showReturnTrips === false) {
            setHide(true);
            setShowReturnTrips(true);
            setTimeout(() => {
                setHide(false);
            }, DEFAULT_TRANSITION_TIMEOUT);
        }
    }

    return (
        <main>
            <div className="container-fluid">
                <div className="container-fluid mt-2">
                    <div className="row">
                        <ErrorAlert show={alert} error={alert}/>
                        <div className="col-12 col-sm-6 d-flex justify-content-start">
                            <button
                                className="btn btn-warning mt-2 mt-sm-1 full-width-xs"
                                onClick={() => {
                                    // Reset trips to avoid showing previous trips
                                    setSelectedTrip({});
                                    setSelectedReturnTrip({});
                                    navigate("/")
                                }}
                            >
                                <FaArrowLeft className="me-2"/>
                                <span>
                                    {textObject.returnToSearch[language]}
                                </span>
                                <FaSearch className="ms-2"/>
                            </button>
                        </div>
                        <div className="col-12 col-sm-6 d-flex justify-content-end">
                            <button
                                id="reservation-btn"
                                className="btn btn-success mt-2 mt-sm-1 full-width-xs"
                                onClick={() => {
                                    console.log(searchParameters);
                                    if ((selectedTrip?.tripId
                                            && searchParameters?.tripType?.value === "oneWayTrip"
                                        ) ||
                                        (selectedTrip?.tripId && selectedReturnTrip?.tripId
                                            && searchParameters?.tripType?.value === "returningTrip"
                                        )) {
                                        navigate("/reservation")
                                    }
                                    else {
                                        setAlert(errorText.seats[language]);
                                    }
                                }}
                            >
                            <MdAirlineSeatReclineExtra className="mb-1 me-2"/>
                            <span>
                                {textObject.reservation[language]}
                            </span>
                            <FaArrowRight className="ms-2"/>
                            </button>
                        </div>
                    </div>
                </div>


                <div className="container d-flex align-items-center justify-content-center mt-3">
                    <h3>{textObject.header[language]}</h3>
                </div>

                {searchParameters?.tripType?.value === "returningTrip" &&
                    <div className="container d-flex align-items-center justify-content-center mt-3">
                        <button
                            className={`btn mx-1 ${!showReturnTrips ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => tripsTransition("trips")}
                        >{textObject.outward[language]}
                        </button>
                        <button
                            className={`btn mx-1 ${showReturnTrips ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => tripsTransition("returnTrips")}
                        >{textObject.return[language]}
                        </button>
                    </div>
                }

                <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                    <div className="trip-header pb-2 row">
                        <div className="col-2 px-1 px-sm-2">
                            <FaTrain/>
                        </div>
                        <div className="col-2 px-1 px-sm-2">
                            <FaFlagCheckered/>
                        </div>
                        <div className="col-2 px-1 px-sm-2">
                            <FaTrain/><FaArrowRight/><FaTrain/>
                        </div>
                        <div className="col-2 px-1 px-sm-2">
                            <FaRegClock/>
                        </div>
                        <div className="col-2 px-1 px-sm-2">
                            <FaEuroSign/>
                        </div>
                        <div className="col-2 px-1 px-sm-2">
                            <FaInfoCircle/>
                        </div>
                    </div>

                    {(hide || loading || returnLoading) &&
                        <div className="spinner-border text-primary mt-3">
                            <output></output>
                            <span className="visually-hidden display-6">Loading...</span>
                        </div>
                    }

                    {!error && !loading && !showReturnTrips && !hide &&
                        trips && trips.map(trip => (
                        <Trip
                            key={trip.tripId}
                            language={language}
                            trip={trip}
                            stations={stations}
                            _selectedTrip={selectedTrip}
                            _setSelectedTrip={setSelectedTrip}
                        />
                    ))}

                    {!returnError && !returnLoading && showReturnTrips && !hide &&
                        returnTrips && returnTrips.map(trip => (
                        <Trip
                            key={trip.tripId}
                            language={language}
                            trip={trip}
                            stations={stations}
                            _selectedTrip={selectedReturnTrip}
                            _setSelectedTrip={setSelectedReturnTrip}
                        />
                    ))}

                    {(!error && !loading && !showReturnTrips && !hide &&
                    (trips?.length === 0)) &&
                        <div className="mt-3 display-6">{textObject.noTripsFound[language]}</div>
                    }

                    {!returnError && !returnLoading && showReturnTrips && !hide &&
                    (returnTrips?.length === 0) &&
                            <div className="mt-3 display-6">{textObject.noTripsFound[language]}</div>
                    }


                </div>

            </div>
        </main>
    );
};

Trips.propTypes = {
    language: PropTypes.string.isRequired,
    searchParameters: PropTypes.object.isRequired,
    stations: PropTypes.object.isRequired,
    selectedTrip: PropTypes.object.isRequired,
    setSelectedTrip: PropTypes.func.isRequired,
    selectedReturnTrip: PropTypes.object.isRequired,
    setSelectedReturnTrip: PropTypes.func.isRequired
}
