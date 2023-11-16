import PropTypes from "prop-types";
import { BrowserView } from "react-device-detect";
import { Tooltip } from "react-tooltip";
import {
    FaChevronDown, FaRegClock,
    FaHashtag, FaSign
}
from "react-icons/fa";

import "./Trip.css";

export const Trip = ({language, trip, stations}) => {
    const toggleDetails = (targetId, event) => {
        const toggleElement = document.getElementById(targetId);
        toggleElement.classList.toggle("hide");
        event.stopPropagation();
    };

    const removeTooltip = (targetId) => {
        const tooltipElement = document.getElementById(targetId);
        tooltipElement.removeAttribute("data-tooltip-content");
    };

    const setInfoTooltip = (targetId) => {
        const tooltipElement = document.getElementById(targetId);
        tooltipElement.setAttribute("data-tooltip-content", "Click to show trip info");

    };

    const resetTooltip = (targetId) => {
        const tooltipElement = document.getElementById(targetId);
        tooltipElement.setAttribute("data-tooltip-content", "Click to select trip");
    };

    const confirmTrip = (targetId) => {
        if (!targetId.includes("trip-wrapper")) {
            return;
        }

        const toggleElement = document.getElementById(targetId);
        alert("Confirm trip?");
    };

    return (
        <>
            <div
                key={"trip-" + trip.tripId}
                className="row mt-3 trip-wrapper" id={`trip-wrapper-${trip.tripId}`}
                onClick={() => confirmTrip(`trip-wrapper-1`)}
                data-tooltip-id="trip-wrapper-1"
                data-tooltip-content="Click to select trip"
                data-tooltip-float
            >

                <BrowserView className="BrowserView"><Tooltip id={`trip-wrapper-${trip.tripId}`}/></BrowserView>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">{trip.startTime || "unknown"}</div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">{trip.arrivalTime || "unknown"}</div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">{trip.interchanges.length || "unknown"}</div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">{trip.duration || "unknown"}</div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">{trip.basicCost || "unknown"}</div>
                <div className="col-2 px-1 px-sm-2 d-flex align-items-center justify-content-center">
                    <button className="btn btn-link"
                        onClick={(event) => {
                            removeTooltip("trip-wrapper-" + trip.tripId);
                            toggleDetails("trip-info-" + trip.tripId, event);
                        }}
                        onMouseEnter={() => setInfoTooltip("trip-wrapper-" + trip.tripId)}
                        onMouseLeave={() => resetTooltip("trip-wrapper-" + trip.tripId)}
                    >
                        <FaChevronDown/>
                    </button>
                </div>
                <BrowserView className="BrowserView"></BrowserView>
            </div>

            <div
                className="container mt-2 trip-info-wrapper hide"
                id={`trip-info-${trip.tripId}`}
            >
                <div
                    key={"info-" + trip.tripId}
                    className="row trip-info-header-wrapper">
                    <div className="col-3 d-flex align-items-center justify-content-center"><FaHashtag/></div>
                    <div className="col-3 d-flex align-items-center justify-content-center"><FaRegClock/></div>
                    <div className="col-3 d-flex align-items-center justify-content-center"><FaSign/></div>
                    <div className="col-3 d-flex align-items-center justify-content-center"><FaHashtag/></div>
                </div>
                {trip.interchanges.map((interchange) => {
                    const stationId = interchange.stationId;
                    const stationName = stations?.stations ?
                    stations.stations[stationId][language] : "-";
                    return (
                        <div
                            className="row trip-info-content-wrapper"
                            key={"interchange-" + trip.tripId + interchange}
                        >
                            <div className="col-3 d-flex align-items-center justify-content-center">{interchange.trainId1}</div>
                            <div className="col-3 d-flex align-items-center justify-content-center">{interchange.time}</div>
                            <div className="col-3 d-flex align-items-center justify-content-center">{stationName}</div>
                            <div className="col-3 d-flex align-items-center justify-content-center">{interchange.trainId2}</div>
                        </div>
                    )
                }
                )}
            </div>

        </>
    )
}

Trip.propTypes = {
    language: PropTypes.string.isRequired,
    trip: PropTypes.object.isRequired,
    stations: PropTypes.object.isRequired
}
