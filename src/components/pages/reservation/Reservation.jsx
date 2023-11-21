import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { useFetch } from "../../../hooks/useFetch";

import {
    FaArrowRight, FaArrowLeft, FaArrowDown,
    FaMoneyCheck, FaTrain, FaChevronUp, FaChevronDown,
} from "react-icons/fa";


import { fetchData } from "../../../utils/asyncFetch.js";
import {
    toggleElementVisibility,  hideElement,
    markSelectedTrip, rotateElement, showElement
}
from "../../../utils/commonFunctionsDOM.js";

import { DEFAULT_TRANSITION_TIMEOUT } from "../../../env/constants";

import textObject from "../../../assets/language/reservation.json";

import "./Reservation.css";

const constructSubTrips = async (_selectedTrip, stations) => {
    const subTrips = [];

    for (const subTrip of _selectedTrip.subTrips) {
        const seats = await fetchData(`/fetch/seats/${_selectedTrip.tripId}/${subTrip.trainId}`);

        subTrips.push({
            tripId: subTrip.tripId,
            trainId: subTrip.trainId,
            startStation: stations[subTrip.startStationId],
            arrivalStation: stations[subTrip.arrivalStationId],
            seats: seats.data,
            startTime: subTrip.startTime,
            arrivalTime: subTrip.arrivalTime
        });
    }

    console.log(subTrips)
    return subTrips;
}

export const Reservation = ({
    language, stations, searchParameters,
    selectedTrip, selectedReturnTrip,
}) => {
    const navigate = useNavigate();
    const [subTrips, setSubTrips] = useState([]);
    const [returnSubTrips, setReturnSubTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [returnLoading, setReturnLoading] = useState(true);
    const [error, setError] = useState("");
    const [returnError, setReturnError] = useState("");
    const seatsRef = useRef(null);
    const passengersRef = useRef(null);

    useEffect(() => {
        // Navigate to home page is search has not been performed
        if (!searchParameters?.tripType || !selectedTrip?.tripId || !stations?.stations ||
            (searchParameters?.tripType.value === "returningTrip" && !selectedReturnTrip?.tripId)) {
            navigate("/");
            return undefined;
        }

        constructSubTrips(selectedTrip, stations.stations).then((_subTrips, error) => {
            if (_subTrips === undefined) {
                setError(error);
            }
            setSubTrips(_subTrips);
            setLoading(false);
        })

        if (searchParameters?.tripType.value === "returningTrip") {
            constructSubTrips(selectedReturnTrip, stations.stations).then((_subTrips, error) => {
                if (_subTrips === undefined) {
                    setReturnError(error);
                }

                setReturnSubTrips(_subTrips);
                setReturnLoading(false);
            })
        }


    }, [navigate, selectedTrip, stations, searchParameters]);

    const openVehicleSeats = () => {
        showElement(seatsRef.current.id, true);
        toggleElementVisibility("onward-trip-selector-wrapper", true);
        toggleElementVisibility("return-trip-selector-wrapper", true);
    }

  return (
    <main>

        {/* Navigation buttons */}
        <div className="container-fluid mt-2">
            <div className="row">
                <div className="col-12 col-sm-6 d-flex justify-content-start">
                    <button
                        className="btn btn-warning mt-2 mt-sm-1 full-width-xs"
                        onClick={() => {
                            navigate("/trips")
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
                            console.log("NAVIGATE TO PAY")
                            // navigate("/pay")
                        }}
                    >
                        <FaMoneyCheck className="mb-1 me-2"/>
                        <span>
                            {textObject.payment[language]}
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

        {/* Trip selector */}
        <div
            className="container border p-3 reservation-items-container"
        >

            {/* Trip selector header */}
            <div className="row d-flex justify-content-center">
                <div className="col-12 d-flex">
                    <span className="flex-fill">
                        Επιλέξτε ένα όχημα για να εμφανιστούν οι διαθέσιμες θέσεις
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
            <div
                className="row d-flex justify-content-start mt-2"
                id="onward-trip-selector-wrapper"
            >
                <div className="col-12 my-2">Ταξίδι Μετάβασης</div>

                {!loading && !error && subTrips && subTrips.map((subTrip) => (
                    <div
                        key={subTrip.trainId}
                        className="col-6 col-sm-4 col-md-3 trip-selector-wrapper my-1 mx-2 p-1"
                        style={{minWidth: "max-content"}}
                        id={`trip-selector-wrapper-${subTrip.tripId}`}
                        onClick={() => {
                            markSelectedTrip(`trip-selector-wrapper-${subTrip.tripId}`,
                                            "trip-selector-wrapper");
                            openVehicleSeats();
                        }}
                    >
                        <div className="d-flex flex-column">
                            <div className="text-center">
                                {subTrip.startStation[language]}&nbsp;
                                ({subTrip.startTime})
                                <FaArrowRight className="ms-1"/>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="text-center">
                                {subTrip.arrivalStation[language]}&nbsp;
                                ({subTrip.arrivalTime})
                            </div>
                        </div>

                    </div>



                ))}

            </div>
            {/* End onward trip selector */}

            {/* Return trip selector */}
            {returnSubTrips?.length > 0 &&
                <div
                    className="row d-flex justify-content-start mt-2"
                    id="return-trip-selector-wrapper"
                >
                    <div className="col-12 my-2">Ταξίδι Επιστροφής</div>

                    {!returnLoading && !returnError && returnSubTrips && returnSubTrips.map((subTrip) => (
                        <div
                            key={subTrip.trainId}
                            className="col-6 col-sm-4 col-md-3 trip-selector-wrapper my-1 mx-2 p-1"
                            id={`trip-selector-wrapper-${subTrip.tripId}`}
                            style={{minWidth: "max-content"}}
                            onClick={() => {
                                markSelectedTrip(`trip-selector-wrapper-${subTrip.tripId}`,
                                                "trip-selector-wrapper");
                                openVehicleSeats();
                            }}
                        >
                            <div className="d-flex flex-column">
                                <div className="text-center">
                                    {subTrip.startStation[language]}&nbsp;
                                    ({subTrip.startTime})
                                    <FaArrowRight className="ms-1"/>
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="text-center">
                                    {subTrip.arrivalStation[language]}&nbsp;
                                    ({subTrip.arrivalTime})
                                </div>
                            </div>

                        </div>
                    ))}

                </div>
            }
            {/* End return trip selector */}

        </div>
        {/* End trip selector */}

        {/* Seat selector */}
        <div className="container border my-2 p-3 reservation-items-container">


            {/* Seat selector header */}
            <div className="row d-flex justify-content-center">
                <div className="col-12 d-flex">
                    <span className="flex-fill">
                        Επιλέξτε τις επιθυμητές θέσεις
                    </span>
                    <span
                        id="chevron-2-span"
                        className="rotate-transition d-flex align-items-center justify-content-center"
                        onClick={() => {
                            rotateElement("chevron-2");
                            toggleElementVisibility("seat-selector-wrapper", true);
                        }}
                        >
                        <FaChevronUp
                            id="chevron-2"
                            className="rotate-transition rotate"
                            />
                    </span>
                </div>
            </div>
            {/* End seat selector header */}

            <div
                // Hide seat selector by default
                className="hide"
                id="seat-selector-wrapper"
                ref={seatsRef}
                >
                test seats
            </div>
        </div>
        {/* End seat selector */}

        {/* Passengers selector */}
        <div className="container border my-2 p-3 reservation-items-container">
            <div
                // Hide passengers selector by default
                className="hide"
                id="passenger-selector-wrapper"
                ref={passengersRef}
                >
                test passengers
            </div>

        </div>
        {/* End passengers selector */}

    </main>
  )
}

Reservation.propTypes = {
    language: PropTypes.string.isRequired,
    stations: PropTypes.object.isRequired,
    searchParameters: PropTypes.object.isRequired,
    selectedTrip: PropTypes.object.isRequired,
    selectedReturnTrip: PropTypes.object.isRequired,
}
