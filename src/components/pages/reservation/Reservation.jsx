import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaTrain, FaArrowRight, FaArrowLeft, FaMoneyCheck } from "react-icons/fa";

import textObject from "../../../assets/language/reservation.json";

const fetchSeats = (trainId) => {
    if (trainId.startsWith("T")) {
        return {}
    }

    return {
        "1": "selected",
        "2": "selected",
        "3": "free",
        "4": "free",
        "5:": "reserved",
        "6": " free",
        "7": "selected",
        "8": "selected",
        "9": "free",
        "10": "reserved"
    }
}

const constructSubTrips = (selectedTrip, stations) => {
    const startStation = stations[selectedTrip.startStationId];
    const arrivalStation = stations[selectedTrip.arrivalStationId];
    const interchanges = selectedTrip.interchanges;

    let subTrips = [];
    let previousSubTrip = {};
    let previousStation = startStation;
    let currentStation = {};

    // Case: Train from start station
    previousSubTrip = {
        trainId: selectedTrip.trainId,
        startStation: previousStation,
        seats: fetchSeats(selectedTrip.trainId)
    }

    for (let subTrip of interchanges) {
        // Get current station
        currentStation = stations[subTrip.stationId];
        // Set arrival station for previous sub trip
        previousSubTrip.arrivalStation = currentStation;
        // Push previous sub trip to sub trips array
        subTrips.push(previousSubTrip);

        // Fetch seats for current sub trip and get train id
        const trainId = subTrip.trainId2;
        const seats = fetchSeats(trainId);

        // Create new sub trip
        // Do not push to subTrips, as we do not know the arrival station yet
        previousSubTrip = {
            trainId: trainId,
            startStation: currentStation,
            seats: seats
        }
    }

    // Set arrival station for last sub trip and push it to sub trips array
    previousSubTrip.arrivalStation = arrivalStation;
    subTrips.push(previousSubTrip);

    return subTrips;
}


export const Reservation = ({language, selectedTrip, stations}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedTrip?.tripId) {
            navigate("/");
            return undefined;
        }
    }, [navigate, selectedTrip]);

    useEffect(() => {
        if (selectedTrip?.tripId) {
            console.log(constructSubTrips(selectedTrip, stations.stations))
        }
    }, [selectedTrip]);

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

        Reservation
        <div>
            <div>{selectedTrip?.tripId}</div>
            <div>{selectedTrip?.startTime}</div>
            <div>{selectedTrip?.arrivalTime}</div>
            <div>{selectedTrip?.duration}</div>
            <div>{selectedTrip?.basicCost}</div>
        </div>

        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div>Trains</div>
                </div>
                <div className="col-12 col-md-4">
                    <div>Seat reservation</div>
                </div>
                <div className="col-12 col-md-4">
                    <div>Passengers</div>
                </div>
            </div>
        </div>
        </main>
  )
}

Reservation.propTypes = {
    language: PropTypes.string.isRequired,
    selectedTrip: PropTypes.object.isRequired,
    stations: PropTypes.object.isRequired
}
