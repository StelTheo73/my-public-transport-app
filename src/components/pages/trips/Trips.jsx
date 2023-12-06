import PropTypes from "prop-types";
import { useEffect, useState, useRef  } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaTrain, FaFlagCheckered, FaSearch,
    FaArrowRight, FaArrowLeft,
    FaRegClock, FaEuroSign, FaInfoCircle,
} from "react-icons/fa";
import { FaRightLeft } from "react-icons/fa6";
import { MdAirlineSeatReclineExtra } from "react-icons/md";

import { HelpCarousel } from "../../help/HelpCarousel.jsx";
import { Trip } from "./Trip.jsx";

import { useFetch } from "../../../hooks/useFetch.jsx";

import "./Trips.css";

import textObject from "../../../assets/language/trips.json";

import { disableElement, enableElement } from "../../../utils/commonFunctionsDOM.js";

import { DEFAULT_TRANSITION_TIMEOUT } from "../../../env/constants.js";

export const Trips = ({
        language, searchParameters, stations,
        selectedTrip, setSelectedTrip,
        selectedReturnTrip, setSelectedReturnTrip,
        setSubTrips, setReturnSubTrips
    }) => {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [returnUrl, setReturnUrl] = useState("");
    const [hide, setHide] = useState(false);
    const [showReturnTrips, setShowReturnTrips] = useState(false);
    const { data: trips, loading, error } = useFetch(url);
    const { data: returnTrips, loading: returnLoading, error: returnError } = useFetch(returnUrl);
    const [help, setHelp] = useState(false);
    const seatsButtonRef = useRef(null);

    // Navigate to home page is search has not been performed
    useEffect(() => {
        if (!searchParameters?.start || !searchParameters?.destination ||
            !searchParameters?.date || !searchParameters?.returnDate ||
            !searchParameters?.tripType ||
            !searchParameters?.start.english || !searchParameters?.destination.english) {
            navigate("/");
            return undefined;
        }
        else {
            window.scrollTo(0, 0);

        setUrl("/fetch/trips/" +
            searchParameters.start.english + searchParameters.destination.english);

            if (searchParameters?.tripType?.value === "returningTrip") {
            setReturnUrl("/fetch/trips/" +
                searchParameters.destination.english + searchParameters.start.english);
        }
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


    }, [selectedTrip, selectedReturnTrip, searchParameters?.tripType?.value]);

    const tripsTransition = tripsToShow => {
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
    };

    if (help)  {
        return (
            <HelpCarousel
                language={language}
                setHelp={setHelp}
                helpPage="trips"
            />
        );
    }
    else {
        return (
            <main>
                {/* Navigation buttons */}
                <div className="container-fluid sticky-container">
                    <div className="row">
                        <div className="col-12 col-sm-6 d-flex justify-content-start">
                            <button
                                className="btn btn-warning mt-2 mt-sm-1 full-width-xs"
                                onClick={() => {
                                    // Reset trips to avoid showing previous trips
                                    setSelectedTrip({});
                                    setSelectedReturnTrip({});
                                    navigate("/");
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
                                ref={seatsButtonRef}
                                id="reservation-btn"
                                className="btn btn-success mt-2 mt-sm-1 full-width-xs"
                                onClick={() => {
                                    if ((selectedTrip?.tripId
                                            && searchParameters?.tripType?.value === "oneWayTrip"
                                        ) ||
                                        (selectedTrip?.tripId && selectedReturnTrip?.tripId
                                            && searchParameters?.tripType?.value === "returningTrip"
                                        )) {
                                        navigate("/reservation");
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
                {/* End navigation buttons */}

                {/* Header */}
                <div className="container d-flex align-items-center justify-content-center mt-3">
                    <h3>{textObject.header[language]}</h3>
                </div>
                {/* End header */}

                {/* Help button */}
                <div
                    className="container d-flex justify-content-end mb-1">
                    <button
                        className="btn btn-outline-primary p-1"
                        onClick={() => setHelp(true)}
                    >
                        <span>{textObject.help[language]}</span>
                        <span className="ms-1"><FaInfoCircle/></span>
                    </button>
                </div>
                {/* End help button */}

                {/* Onward & Return trip buttons */}
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
                {/* End onward & return trip buttons */}

                {/* Trips */}
                <div className="d-flex flex-column align-items-center justify-content-center mt-3 px-3">
                    <div className="trip-header pb-2 px-3 d-flex justify-content-between">
                        <div className="px-1 px-sm-2 d-flex align-items-center justify-content-center text-primary-bold">
                            <FaTrain/>
                        </div>
                        {/* hide-360 elements do not have d-flex on purpose. They get "display: flex" through index.css */}
                        <div className="px-1 px-sm-2 align-items-center justify-content-center hide-360 text-primary-bold">
                            <FaRightLeft/>
                        </div>
                        <div className="px-1 px-sm-2 d-flex align-items-center justify-content-center text-primary-bold">
                            <FaFlagCheckered/>
                        </div>
                        {/* hide-360 elements do not have d-flex on purpose. They get "display: flex" through index.css */}
                        <div className="px-1 px-sm-2 align-items-center justify-content-center hide-360 text-primary-bold">
                            <FaRegClock/>
                        </div>
                        <div className="px-1 px-sm-2 d-flex align-items-center justify-content-center text-primary-bold">
                            <FaEuroSign/>
                        </div>
                        <div className="px-1 px-sm-2 d-flex align-items-center justify-content-center text-primary-bold">
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
                            setSubTrips={setSubTrips}
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
                            setSubTrips={setReturnSubTrips}
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
                {/* End trips */}

                <span
                    className=""
                    tabIndex={0}
                    onFocus={() => seatsButtonRef.current.focus()}
                >
        </span>

            </main>
        );
    }
};

Trips.propTypes = {
    language: PropTypes.string.isRequired,
    searchParameters: PropTypes.object.isRequired,
    stations: PropTypes.object.isRequired,
    selectedTrip: PropTypes.object.isRequired,
    setSelectedTrip: PropTypes.func.isRequired,
    selectedReturnTrip: PropTypes.object.isRequired,
    setSelectedReturnTrip: PropTypes.func.isRequired,
    setSubTrips: PropTypes.func.isRequired,
    setReturnSubTrips: PropTypes.func.isRequired
};
