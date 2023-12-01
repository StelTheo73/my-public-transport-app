import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaArrowRight, FaArrowLeft, FaInfoCircle,
    FaTrain, FaChevronUp, FaRegWindowClose
} from "react-icons/fa";
import { FaPersonHalfDress } from "react-icons/fa6";

import { Seats } from "./Seats.jsx";
import { TripSelector } from "./TripSelector.jsx";
import { HelpCarousel } from "../help/HelpCarousel.jsx";


import { fetchData } from "../../../utils/asyncFetch.js";
import {
    toggleElementVisibility, rotateElement
}
from "../../../utils/commonFunctionsDOM.js";

// import { DEFAULT_TRANSITION_TIMEOUT } from "../../../env/constants";

import textObject from "../../../assets/language/reservation.json";

import "./Reservation.css";

const constructSubTrips = async (_selectedTrip, stations) => {
    const subTrips = [];

    for (const subTrip of _selectedTrip.subTrips) {
        const seats = await fetchData(`/fetch/seats/${_selectedTrip.tripId}/${subTrip.trainId}`);

        const selectedSeats = Object.keys(seats.data).reduce((result, wagonId) => {
            result[wagonId] = [];
            return result;
          }, {});

        subTrips.push({
            tripId: subTrip.tripId,
            trainId: subTrip.trainId,
            startStation: stations[subTrip.startStationId],
            arrivalStation: stations[subTrip.arrivalStationId],
            seats: seats.data,
            startTime: subTrip.startTime,
            arrivalTime: subTrip.arrivalTime,
            selectedSeats: selectedSeats,
            basicCost: subTrip.basicCost
        });
    }

    return subTrips;
}

export const Reservation = ({
    language, stations, searchParameters,
    selectedTrip, selectedReturnTrip,
    subTrips, setSubTrips,
    returnSubTrips, setReturnSubTrips,
    setNoOfSeats
}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [returnLoading, setReturnLoading] = useState(true);
    const [error, setError] = useState("");
    const [returnError, setReturnError] = useState("");
    const [activeTrip, setActiveTrip] = useState({});
    const tripsContainerRef = useRef(null);
    const seatsRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [help, setHelp] = useState(false);

    useEffect(() => {
        // Navigate to home page is search has not been performed
        if (!searchParameters?.tripType || !selectedTrip?.tripId || !stations?.stations ||
            (searchParameters?.tripType.value === "returningTrip" && !selectedReturnTrip?.tripId)) {
            navigate("/");
        }
        else {
            window.scrollTo(0, 0);

            if (subTrips.length === 0) {
                constructSubTrips(selectedTrip, stations.stations).then((_subTrips, _error) => {
                    if (_subTrips === undefined) {
                        setError(_error);
                    }
                    setSubTrips(_subTrips);
                });
            }
            else {
                setActiveTrip(subTrips[0]);
            }
            setLoading(false);

            if (searchParameters?.tripType.value === "returningTrip") {
                if (returnSubTrips.length === 0) {
                    constructSubTrips(selectedReturnTrip, stations.stations).then((_subTrips, _error) => {
                        if (_subTrips === undefined) {
                            setReturnError(_error);
                        }
                        setReturnSubTrips(_subTrips);
                    });
                }
                setReturnLoading(false);
            }

            // setActiveTrip({});
        }

    }, [navigate, selectedTrip, selectedReturnTrip, stations, searchParameters]);

    const validateSelectedSeats = () => {
        setErrorMessage("");
        setErrorDescription("");

        const tripsWithSeats = [];
        let errorFound = false;

        for (const subTrip of subTrips) {
            const sum = Object.keys(subTrip.selectedSeats).map(wagonId => {
                return subTrip.selectedSeats[wagonId].length;
            }).reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);

            if (Object.keys(subTrip.seats).length > 0) {
                tripsWithSeats.push({
                    tripId: subTrip.tripId,
                    startStation: subTrip.startStation,
                    arrivalStation: subTrip.arrivalStation,
                    noOfSeats: sum
                });
            }
        }

        for (const subTrip of returnSubTrips) {
            const sum = Object.keys(subTrip.selectedSeats).map(wagonId => {
                return subTrip.selectedSeats[wagonId].length;
            }).reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);

            if (Object.keys(subTrip.seats).length > 0) {
                tripsWithSeats.push({
                    tripId: subTrip.tripId,
                    startStation: subTrip.startStation,
                    arrivalStation: subTrip.arrivalStation,
                    noOfSeats: sum
                })
            }
        }

        let seatsNo = -1;
        tripsWithSeats.forEach(trip => {
            // Case: first trip
            if (seatsNo === -1) {
                seatsNo = trip.noOfSeats;
            }
            // Different number of seats selected
            else if (seatsNo !== trip.noOfSeats) {
                    setErrorMessage("Παρακαλώ επιλέξτε τον ίδιο αριθμό θέσεων για όλα τα ταξίδια");

                    const _errorDescription = [];
                    _errorDescription.push({header: "Θέσεις ανά δρομολόγιο:"});

                    tripsWithSeats.forEach(_trip => {
                        _errorDescription.push({
                            tripId: _trip.tripId,
                            startStation: _trip.startStation,
                            arrivalStation: _trip.arrivalStation,
                            noOfSeats: _trip.noOfSeats
                        });
                    });
                    setErrorDescription(_errorDescription);
                    errorFound = true;
                    return;
            }
        });

        // No seats selected but there are trips with seats
        if (seatsNo === 0 && tripsWithSeats.length > 0) {
            setErrorMessage("Παρακαλώ επιλέξτε θέσεις για όλα τα ταξίδια");
            errorFound = true;
            return;
        }

        if (errorFound === false) {
            setNoOfSeats(seatsNo);
            navigate("/passengers");
        }
    };

    if (help) {
        return (
            <HelpCarousel
                language={language}
                setHelp={setHelp}
                helpPage="reservation"
            />
        );
    }
    else {
        return (
            <main>
                {/* Error message popup */}
                {errorMessage &&
                    <div id="seat-error-message">
                        <div className="alert alert-danger my-0" role="alert">
                            <div className="d-flex flex-row">
                                <span className="me-2">
                                    {errorMessage}
                                </span>
                                <span
                                    id="close-seat-error-message"
                                    className="ms-2"
                                    onClick={() => setErrorMessage("")}
                                >
                                    <FaRegWindowClose />
                                </span>
                            </div>
                            {errorDescription && <>
                                <hr></hr>
                                <div className="d-flex flex-column">
                                    {errorDescription.map(element => {
                                        if (element?.header) {
                                            return <span key="seat-error-header" className="fw-bold">
                                                {element?.header}
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
                }
                {/* End error message popup */}

                {/* Navigation buttons */}
                <div className="container-fluid sticky-container">
                    <div className="row">
                        <div className="col-12 col-sm-6 d-flex justify-content-start">
                            <button
                                className="btn btn-warning mt-2 mt-sm-1 full-width-xs"
                                onClick={() => {
                                    navigate("/trips");
                                }}
                            >
                                <FaArrowLeft className="me-2"/>
                                <span>
                                    {textObject.returnToTrips[language]}
                                </span>
                                <FaTrain className="ms-2"/>
                            </button>
                        </div>
                        <div className="col-12 col-sm-6 d-flex justify-content-end">
                            <button
                                id="reservation-btn"
                                className="btn btn-success mt-2 mt-sm-1 full-width-xs"
                                onClick={() => {
                                    validateSelectedSeats();
                                }}
                            >
                                <FaPersonHalfDress className="mb-1 me-2"/>
                                <span>
                                    {textObject.passengers[language]}
                                </span>
                                <FaArrowRight className="ms-2"/>
                            </button>
                        </div>
                    </div>
                </div>
                {/* End navigation buttons */}

                {/* Header */}
                <div className="container d-flex align-items-center justify-content-center mt-3">
                    <h3 id="page-header">{textObject.header[language]}</h3>
                </div>
                {/* End header */}

                <div
                    className="container d-flex justify-content-end mb-1 width-90">
                    <div
                        className="help-button d-flex align-items-center border border-primary rounded p-1"
                        onClick={() => setHelp(true)}
                    >
                        <span className="text-primary" style={{userSelect: "none"}}>{textObject.help[language]}</span>
                        <span className="ms-1"><FaInfoCircle className="text-primary"/></span>
                    </div>
                </div>

                {/* Trip selector */}
                <div
                    className="container border p-3 reservation-items-container width-90"
                    ref={tripsContainerRef}
                >

                    {/* Trip selector header */}
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 d-flex">
                            <span className="flex-fill">
                                {textObject.tripSelectorHeader[language]}
                            </span>
                            <span
                                id="chevron-1-span"
                                className="rotate-transition d-flex align-items-center justify-content-center"
                                onClick={() => {
                                    rotateElement("chevron-1");
                                    toggleElementVisibility("onward-trip-selector-wrapper", true);
                                    toggleElementVisibility("return-trip-selector-wrapper", true);
                                }}
                                >
                                <FaChevronUp
                                    id="chevron-1"
                                    className="rotate-transition"
                                    />
                            </span>
                        </div>
                    </div>
                    {/* End trip selector header */}

                    {/* Onward trip selector */}
                    <TripSelector
                        language={language}
                        id="onward-trip-selector-wrapper"
                        activeTrip={activeTrip}
                        setActiveTrip={setActiveTrip}
                        tripsContainerRef={tripsContainerRef}
                        seatsRef={seatsRef}
                        loading={loading}
                        error={error}
                        subTrips={subTrips}
                        header={textObject.onwardTrip[language]}
                    />
                    {/* End onward trip selector */}

                    {/* Return trips selector */}
                    <TripSelector
                        language={language}
                        id="return-trip-selector-wrapper"
                        activeTrip={activeTrip}
                        setActiveTrip={setActiveTrip}
                        tripsContainerRef={tripsContainerRef}
                        seatsRef={seatsRef}
                        loading={returnLoading}
                        error={returnError}
                        subTrips={returnSubTrips}
                        header={textObject.returnTrip[language]}
                    />
                    {/* End return trip selector */}

                </div>
                {/* End trip selector */}

                {/* Seat selector */}
                <div className="container border my-2 p-3 reservation-items-container width-90">


                    {/* Seat selector header */}
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 d-flex">
                            <span className="flex-fill">
                                {textObject.seatSelectorHeader[language]}
                            </span>
                            <span
                                id="chevron-2-span"
                                className="rotate-transition d-flex align-items-center justify-content-center"
                                onClick={() => {
                                    rotateElement("chevron-2");
                                    toggleElementVisibility("seat-selector-wrapper");
                                }}
                                >
                                <FaChevronUp
                                    id="chevron-2"
                                    className="rotate-transition"
                                    />
                            </span>
                        </div>
                    </div>
                    {/* End seat selector header */}

                    <Seats
                        language={language}
                        activeTrip={activeTrip}
                        setActiveTrip={setActiveTrip}
                        ref={seatsRef}
                    />
                </div>
                {/* End seat selector */}

            </main>
      );
    }
}

Reservation.propTypes = {
    language: PropTypes.string.isRequired,
    stations: PropTypes.object.isRequired,
    searchParameters: PropTypes.object.isRequired,
    // The trip that user has selected from clicking on a Trip element
    selectedTrip: PropTypes.object.isRequired,
    selectedReturnTrip: PropTypes.object.isRequired,
    // SubTrips created at App.jsx to remain after navigation to other pages
    // SubTrips are created from selectedTrip and selectedReturnTrip
    // Trip.jsx resets subTrips to [] when a new Trip is clicked
    // Reservation.jsx only creates new subTrips only if subTrips.length === 0,
    // which means that the user has selected a new Trip
    // Same applies for returnSubTrips
    subTrips: PropTypes.array.isRequired,
    setSubTrips: PropTypes.func.isRequired,
    returnSubTrips: PropTypes.array.isRequired,
    setReturnSubTrips: PropTypes.func.isRequired,
    setNoOfSeats: PropTypes.func.isRequired
};
