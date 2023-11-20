import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useFetch } from "../../../hooks/useFetch";

import { FaTrain, FaArrowRight, FaArrowLeft, FaArrowDown, FaMoneyCheck } from "react-icons/fa";

import textObject from "../../../assets/language/reservation.json";

import { fetchData } from "../../../utils/asyncFetch.js";

import { DEFAULT_TRANSITION_TIMEOUT } from "../../../env/constants";

import "./Reservation.css";

// const fetchSeats = (trainId) => {
//     if (trainId.startsWith("T")) {
//         return {}
//     }

//     return {
//         "1": "selected",
//         "2": "selected",
//         "3": "free",
//         "4": "free",
//         "5:": "reserved",
//         "6": " free",
//         "7": "selected",
//         "8": "selected",
//         "9": "free",
//         "10": "reserved"
//     }
// }

// const _constructSubTrips = (selectedTrip, stations) => {
//     const startStation = stations[selectedTrip.startStationId];
//     const arrivalStation = stations[selectedTrip.arrivalStationId];
//     const interchanges = selectedTrip.interchanges;

//     let subTrips = [];
//     let previousSubTrip = {};
//     let previousStation = startStation;
//     let currentStation = {};

//     // Case: Train from start station
//     previousSubTrip = {
//         trainId: selectedTrip.trainId,
//         startStation: previousStation,
//         seats: fetchSeats(selectedTrip.trainId)
//     }

//     for (let subTrip of interchanges) {
//         // Get current station
//         currentStation = stations[subTrip.stationId];
//         // Set arrival station for previous sub trip
//         previousSubTrip.arrivalStation = currentStation;
//         // Push previous sub trip to sub trips array
//         subTrips.push(previousSubTrip);

//         // Fetch seats for current sub trip and get train id
//         const trainId = subTrip.trainId2;
//         const seats = fetchSeats(trainId);

//         // Create new sub trip
//         // Do not push to subTrips, as we do not know the arrival station yet
//         previousSubTrip = {
//             trainId: trainId,
//             startStation: currentStation,
//             seats: seats
//         }
//     }

//     // Set arrival station for last sub trip and push it to sub trips array
//     previousSubTrip.arrivalStation = arrivalStation;
//     subTrips.push(previousSubTrip);

//     return subTrips;
// }


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

    const constructSubTrips = async (_selectedTrip) => {
        const subTrips = [];

        for (const subTrip of _selectedTrip.subTrips) {
            const seats = await fetchData(`/fetch/seats/${_selectedTrip.tripId}/${subTrip.trainId}`);

            subTrips.push({
                trainId: subTrip.trainId,
                startStation: stations.stations[subTrip.startStationId],
                arrivalStation: stations.stations[subTrip.arrivalStationId],
                seats: seats.data,
                startTime: subTrip.startTime,
                arrivalTime: subTrip.arrivalTime
            });
        }

        return subTrips;
    }

    useEffect(() => {
        // Navigate to home page is search has not been performed
        if (!searchParameters?.tripType || !selectedTrip?.tripId || !stations?.stations ||
            (searchParameters?.tripType.value === "returningTrip" && !selectedReturnTrip?.tripId)) {
            navigate("/");
            return undefined;
        }

        constructSubTrips(selectedTrip).then((_subTrips, error) => {
            if (_subTrips === undefined) {
                setError(error);
            }
            console.log(_subTrips);
            setSubTrips(_subTrips);
            setLoading(false);
        })

        if (searchParameters?.tripType.value === "returningTrip") {
            constructSubTrips(selectedReturnTrip).then((_subTrips, error) => {
                if (_subTrips === undefined) {
                    setReturnError(error);
                }

                setReturnSubTrips(_subTrips);
                setReturnLoading(false);
            })
        }


    }, [navigate, selectedTrip, stations, searchParameters]);


  return (
    <main>
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

        <div className="container d-flex align-items-center justify-content-center mt-3">
            <h3>{textObject.header[language]}</h3>
        </div>

        <div className="container border">


                <div className="row d-flex justify-content-center">
                    <div className="col-12">
                        Επιλέξτε ένα όχημα για να εμφανιστούν οι διαθέσιμες θέσεις
                    </div>
                </div>

                <div className="row d-flex justify-content-start mt-2">
                    <div className="col-12 my-2">Ταξίδι Μετάβασης</div>

                    {!loading && !error && subTrips && subTrips.map((subTrip) => (
                        <div
                            key={subTrip.trainId}
                            className="col-6 col-sm-4 col-md-3 trip-selector-wrapper my-1 mx-2 p-1 border"
                        >
                            <div className="d-flex flex-column">
                                <div className="text-start">
                                    {subTrip.startStation[language]}&nbsp;
                                    ({subTrip.startTime})
                                    <FaArrowRight className="ms-1"/>
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="text-start">
                                    {subTrip.arrivalStation[language]}&nbsp;
                                    ({subTrip.arrivalTime})
                                </div>
                            </div>

                        </div>



                    ))}

                </div>

                <div className="row d-flex justify-content-center mt-3">
                    <div className="col-12 my-1">Ταξίδι Επιστροφής</div>

                    {!returnLoading && !returnError && returnSubTrips && returnSubTrips.map((subTrip) => (
                        <div
                            key={subTrip.trainId}
                            className="col-12 col-sm-6 col-md-4"
                        >{subTrip.trainId}
                        </div>



                    ))}

                </div>


            </div>


            <div className="container w-75 border my-2">
                <div>Seat reservation</div>
            </div>

            <div className="container w-75 border my-2">
                <div>Passengers</div>
            </div>

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
