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
    }, [trip, _selectedTrip]);

    return (
        <>
            {/* Trip Info */}
            <div
                key={"trip-" + trip.tripId}
                className="mt-3 trip-wrapper d-flex flex-column justify-content-center" id={`trip-wrapper-${trip.tripId}`}
                style={{transparency: "1"}}
                onClick={() => confirmTrip()}
                data-tooltip-id={`trip-wrapper-${trip.tripId}`}
                data-tooltip-content={textObject.tooltipSelect[language]}
                data-tooltip-float
                tabIndex={0}
                onKeyDown={event => {
                    if (event.key === " " || event.key === "Enter") {
                        event.stopPropagation();
                        event.preventDefault();
                        confirmTrip();
                    }
                }}
            >
                <BrowserView className="BrowserView"><Tooltip id={`trip-wrapper-${trip.tripId}`}/></BrowserView>

                <div className="d-flex pb-0 align-items-center justify-content-between">
                    <div className="px-1 px-sm-2 d-flex align-items-center justify-content-center">
                        {trip.startTime || "unknown"}
                    </div>
                    {/* hide-360 elements do not have d-flex on purpose. They get "display: flex" through index.css */}
                    <div className="px-1 px-sm-2 align-items-center justify-content-center hide-360">
                        {trip.interchanges.length || "0"}
                    </div>
                    <div className="px-1 px-sm-2 d-flex align-items-center justify-content-center">
                        {trip.arrivalTime || "unknown"}
                    </div>
                    {/* hide-360 elements do not have d-flex on purpose. They get "display: flex" through index.css */}
                    <div className="px-1 px-sm-2 align-items-center justify-content-center hide-360">
                        {trip.duration || "unknown"}
                    </div>
                    <div className="px-1 px-sm-2 d-flex align-items-center justify-content-center">
                        {trip.basicCost || "unknown"}
                    </div>
                    <div className="px-1 px-sm-2 d-flex align-items-center justify-content-center">
                        <button className="btn btn-link btn-sm"
                            onClick={event => {
                                removeTooltip("trip-wrapper-" + trip.tripId);
                                toggleDetails("trip-info-" + trip.tripId, event);
                            }}
                            onMouseEnter={() => setTooltipContent(
                                "trip-wrapper-" + trip.tripId, textObject.tooltipInfo[language])}
                            onMouseLeave={() => setTooltipContent(
                                "trip-wrapper-" + trip.tripId, textObject.tooltipSelect[language])}
                            onKeyDown={event => {
                                if (event.key === " " || event.key === "Enter") {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    removeTooltip("trip-wrapper-" + trip.tripId);
                                    toggleDetails("trip-info-" + trip.tripId, event);
                                }
                            }}
                        >
                            <FaChevronDown/>
                        </button>
                    </div>
                </div>

                {/* <BrowserView className="BrowserView"></BrowserView> */}
            </div>
            {/* End Trip Info */}

            {/* Sub Trips */}
            <div
                className="container mt-2 px-1 trip-info-wrapper hide"
                id={`trip-info-${trip.tripId}`}
            >
                {trip.subTrips.map(subTrip => (
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
            {/* End Sub Trips */}

        </>
    );
};

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
};
