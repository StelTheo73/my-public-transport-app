import { useEffect  } from "react";
import { useNavigate } from "react-router-dom";

import { Tooltip } from "react-tooltip";
import {
    FaTrain, FaFlagCheckered, FaArrowRight,
    FaRegClock, FaEuroSign, FaInfoCircle,
    FaChevronDown
}
    from "react-icons/fa";

import "./Trips.css";

export const Trips = ({ language, trips }) => {
    const navigate = useNavigate();

    // Navigate to home page is search has not been performed
    useEffect(() => {
        if (trips.searchPerformed !== true) {
            navigate("/");
    }
    }, [navigate, trips.searchPerformed]);

    const toggleDetails = (targetId, event) => {
        const toggleElement = document.getElementById(targetId);
        toggleElement.classList.toggle("hide");
        event.stopPropagation();
    };

    const removeTooltip = (targetId) => {
        const tooltipElement = document.getElementById(targetId);
        // tooltipElement.removeAttribute("data-tooltip-content");
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


    if (trips.searchPerformed === true) {
        return (
            <main>
                <div className="container-fluid">
                    <div className="container d-flex align-items-center justify-content-center">
                        <h3>Trips</h3>
                    </div>

                    <div className="d-flex flex-column align-items-center">
                        <div className="trip-header pb-2 row">
                            <div className="col-2 px-1 px-sm-2">
                                <FaTrain/>
                            </div>
                            <div className="col-2 px-1 px-sm-2">
                                <FaFlagCheckered/>
                            </div>
                            <div className="col-2 px-1 px-sm-2">
                                <FaTrain/><FaArrowRight/><FaTrain/>
                            </div>
                            <div className="col-2 px-1 px-sm-2">
                                <FaRegClock/>
                            </div>
                            <div className="col-2 px-1 px-sm-2">
                                <FaEuroSign/>
                            </div>
                            <div className="col-2 px-1 px-sm-2">
                                <FaInfoCircle/>
                            </div>
                        </div>

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
                        <div
                            className="trip-wrapper row mt-2" id="trip-wrapper-2"
                            onClick={() => confirmTrip("trip-wrapper-1")}
                        >
                            <div className="col-2 px-1 px-sm-2">12:00</div>
                            <div className="col-2 px-1 px-sm-2">12:30</div>
                            <div className="col-2 px-1 px-sm-2">-</div>
                            <div className="col-2 px-1 px-sm-2">30'</div>
                            <div className="col-2 px-1 px-sm-2">2.5€</div>
                            <div className="col-2 px-1 px-sm-2">
                                <button className="btn btn-link" onClick={(event) => toggleDetails("trip-info-2", event)}>
                                    <FaChevronDown />
                                </button>
                            </div>
                        </div>
                        <div className="row mt-2 trip-info-wrapper hide" id="trip-info-2">
                            <div className="col">Details 1</div>
                            <div className="col">Details 2</div>
                            <div className="col">Details 3</div>
                            <div className="col">Details 4</div>
                        </div>
                        <div className="trip-wrapper row mt-2">
                            <div className="col-2 px-1 px-sm-2">12:00</div>
                            <div className="col-2 px-1 px-sm-2">12:30</div>
                            <div className="col-2 px-1 px-sm-2">-</div>
                            <div className="col-2 px-1 px-sm-2">30'</div>
                            <div className="col-2 px-1 px-sm-2">2.5€</div>
                            <div className="col-2 px-1 px-sm-2">-</div>
                        </div>
                    </div>

                </div>
            </main>
        );
    }

    return null;
};
