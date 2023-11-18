import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaTrain, FaArrowRight, FaArrowLeft, FaMoneyCheck } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

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
    selectedTrip: PropTypes.object.isRequired
}
