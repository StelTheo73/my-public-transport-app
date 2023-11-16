import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import textObject from "../../../assets/language/reservation.json";

export const Reservation = ({language, selectedTrip}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedTrip?.tripId) {
            navigate("/");
            return undefined;
        }
    });


  return (
    <main>
        <div className="container-fluid">
            <div className="container d-flex align-items-center justify-content-end">
                <button
                    className="btn btn-warning"
                    onClick={() => navigate("/trips")}
                >{textObject.returnToTrips[language]}
                </button>
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
        </main>
  )
}

Reservation.propTypes = {
    language: PropTypes.string,
    selectedTrip: PropTypes.object
}
