import { BrowserView } from "react-device-detect";
import { Tooltip } from "react-tooltip";
import { FaChevronDown } from "react-icons/fa";

import "./Trip.css";

export const Trip = ({language, trip}) => {
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

    console.log(trip)
  return (
        <>
            <div
                className="row mt-3 trip-wrapper" id={`trip-wrapper-${trip.tripId}`}
                onClick={() => confirmTrip(`trip-wrapper-1`)}
                data-tooltip-id="trip-wrapper-1"
                data-tooltip-content="Click to select trip"
                data-tooltip-float
            >

                <BrowserView>
                    <Tooltip id={`trip-wrapper-${trip.tripId}`}/>
                </BrowserView>
                <div className="col-2 px-1 px-sm-2">{trip.startTime || "unknown"}</div>
                <div className="col-2 px-1 px-sm-2">{trip.arrivalTime || "unknown"}</div>
                <div className="col-2 px-1 px-sm-2">{trip.interchanges.length || "unknown"}</div>
                <div className="col-2 px-1 px-sm-2">{trip.duration || "unknown"}</div>
                <div className="col-2 px-1 px-sm-2">{trip.basicCost || "unknown"}</div>
                <div className="col-2 px-1 px-sm-2">
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
            </div>

            <div className="row mt-2 trip-info-wrapper hide" id={`trip-info-${trip.tripId}`}>
                <div className="col-3">ID1</div>
                <div className="col-3">Interchange Time</div>
                <div className="col-3">Station</div>
                <div className="col-3">ID2</div>
                {trip.interchanges.map(interchange => (
                    <>
                        <div className="col-3">{interchange.trainId1}</div>
                        <div className="col-3">{interchange.time}</div>
                        <div className="col-3">{interchange.stationId}</div>
                        <div className="col-3">{interchange.trainId2}</div>

                    </>
                ))}
            </div>
        </>

    )
}
