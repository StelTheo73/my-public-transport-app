import PropTypes from "prop-types";
import { BrowserView } from "react-device-detect";
import { Tooltip } from "react-tooltip";
import {FaChevronDown, FaArrowRight,} from "react-icons/fa";
import "./Trip.css";
import textObject from "../../../assets/language/trips.json";
import { useEffect } from "react";

import {
    removeTooltip, setTooltipContent, markSelectedTrip
} from "../../../utils/commonFunctionsDOM.js";


export const Trip = ({language, trip, stations,
    _selectedTrip, _setSelectedTrip, setSubTrips
}) => {

    const toggleDetails = (targetId, event) => {
        const toggleElement = document.getElementById(targetId);
        toggleElement.classList.toggle("hide");
        event.stopPropagation();
    };

    const confirmTrip = () => {
        _setSelectedTrip(trip);
        setSubTrips([]);
    };

    useEffect(() => {
        if (_selectedTrip?.tripId === trip?.tripId) {
            markSelectedTrip("trip-wrapper-" + trip.tripId);
        }
    }, [trip, _selectedTrip])

    return (
        <>
            {/* <div className="position-fixed top-50 hide" id="successful-message">
                <div className="alert alert-success alert-dismissible" role="alert">
                    <strong>Success!</strong>
                    <button
                        className="btn-close" aria-label="Close"
                        onClick={() => hideElement("successful-message")}>
                    </button>
                </div>
            </div>
            <div className="position-fixed top-50 hide" id="warning-message">
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Warning!</strong>
                    <button
                        className="btn-close" aria-label="Close"
                        onClick={() => hideElement("warning-message")}
                        >
                    </button>
                </div>
            </div> */}

            <div
                key={"trip-" + trip.tripId}
                className="row mt-3 trip-wrapper" id={`trip-wrapper-${trip.tripId}`}
                onClick={() => confirmTrip(`trip-wrapper-${trip.tripId}`)}
                data-tooltip-id={`trip-wrapper-${trip.tripId}`}
                data-tooltip-content={textObject.tooltipSelect[language]}
                data-tooltip-float
            >

                <BrowserView className="BrowserView"><Tooltip id={`trip-wrapper-${trip.tripId}`}/></BrowserView>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    {trip.startTime || "unknown"}
                </div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    {trip.arrivalTime || "unknown"}
                </div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    {trip.interchanges.length || "0"}
                </div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    {trip.duration || "unknown"}
                </div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    {trip.basicCost || "unknown"}
                </div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    <button className="btn btn-link"
                        onClick={(event) => {
                            removeTooltip("trip-wrapper-" + trip.tripId);
                            toggleDetails("trip-info-" + trip.tripId, event);
                        }}
                        onMouseEnter={() => setTooltipContent(
                            "trip-wrapper-" + trip.tripId, textObject.tooltipInfo[language])}
                        onMouseLeave={() => setTooltipContent(
                            "trip-wrapper-" + trip.tripId, textObject.tooltipSelect[language])}
                    >
                        <FaChevronDown/>
                    </button>
                </div>
                <BrowserView className="BrowserView"></BrowserView>
            </div>

            <div
                className="container mt-2 px-1 trip-info-wrapper hide"
                id={`trip-info-${trip.tripId}`}
            >
                {trip.subTrips.map((subTrip) => (
                    <div
                        key={`${subTrip.tripId}-${subTrip.trainId}`}
                        className="row my-2 mx-1 py-1 d-flex align-items-center justify-content-center">
                        <div className="col-12 col-sm-2 d-flex flex-column align-items-center">
                            <span>
                                {subTrip.trainId}
                            </span>
                            <span>
                                ({subTrip.trainId[0] === "B" ? textObject.bus[language] : textObject.train[language]})
                            </span>
                        </div>
                        <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                            <span>
                                {stations.stations[subTrip.startStationId][language]}
                            </span>
                            <span>
                                ({subTrip.startTime})
                            </span>
                        </div>
                        <div className="col-4 col-sm-2 d-flex align-items-center justify-content-center">
                            <FaArrowRight/>
                        </div>
                        <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                            <span>
                                {stations.stations[subTrip.arrivalStationId][language]}
                            </span>
                            <span>
                                ({subTrip.arrivalTime})
                            </span>
                        </div>
                    </div>
                ))}

            </div>

        </>
    )
}

Trip.propTypes = {
    // The selected language
    language: PropTypes.string.isRequired,
    trip: PropTypes.object.isRequired,
    // The stations
    stations: PropTypes.object.isRequired,
    // Selected trip
    _selectedTrip: PropTypes.object.isRequired,
    // Set selected trip
    _setSelectedTrip: PropTypes.func.isRequired,
    // Reset subTrips if selected trip changes
    setSubTrips: PropTypes.func.isRequired
}
