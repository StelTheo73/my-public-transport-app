import { Tooltip } from "react-tooltip";
import { FaChevronDown } from "react-icons/fa";


export const Trip = ({language, trip}) => {
    const toggleDetails = (targetId, event) => {
        const toggleElement = document.getElementById(targetId);
        toggleElement.classList.toggle("hide");
        event.stopPropagation();
    };

    const removeTooltip = (targetId) => {
        const tooltipElement = document.getElementById(targetId);
        tooltipElement.setAttribute("data-tooltip-content", "Click to show trip info");

    };

    const addTooltip = (targetId) => {
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
                className="row mt-3 trip-wrapper" id="trip-wrapper-1"
                onClick={() => confirmTrip("trip-wrapper-1")}
                data-tooltip-id="trip-wrapper-1"
                data-tooltip-content="Click to select trip"
                data-tooltip-float
            >
                <Tooltip id="trip-wrapper-1"/>
                <div className="col-2 px-1 px-sm-2">12:00</div>
                <div className="col-2 px-1 px-sm-2">12:30</div>
                <div className="col-2 px-1 px-sm-2">-</div>
                <div className="col-2 px-1 px-sm-2">30'</div>
                <div className="col-2 px-1 px-sm-2">2.5€</div>
                <div className="col-2 px-1 px-sm-2">
                    <button className="btn btn-link"
                        onClick={(event) => toggleDetails("trip-info-1", event)}
                        onMouseEnter={() => removeTooltip("trip-wrapper-1")}
                        onMouseLeave={() => addTooltip("trip-wrapper-1")}
                    >
                        <FaChevronDown/>
                    </button>
                </div>
            </div>

            <div className="row mt-2 trip-info-wrapper hide" id="trip-info-1">
                <div className="col-3">ID1</div>
                <div className="col-3">Interchange Time</div>
                <div className="col-3">Station</div>
                <div className="col-3">ID2</div>
                <div className="col-3">1234</div>
                <div className="col-3">12:30</div>
                <div className="col-3">Agioi Anargyroi</div>
                <div className="col-3">2345</div>
                <div className="col-3">2345</div>
                <div className="col-3">12:40</div>
                <div className="col-3">Zevgolatio Korinthias</div>
                <div className="col-3">5678</div>
            </div>
        </>

    )
}
