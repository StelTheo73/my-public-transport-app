import React from "react";
import PropTypes from "prop-types";

import { BusSeats } from "./BusSeats";
import { TrainSeats } from "./TrainSeats";

import { markSelectedTrip, showElement } from "../../../utils/commonFunctionsDOM";
import "./Seats.css";

import textObject from "../../../assets/language/reservation.json";

const toggleWagonSeats = (tripWagonId, wagonId) => {
    document.querySelectorAll(".wagon-seat-selector-wrapper").forEach((wagonSeatSelector) => {
        wagonSeatSelector.classList.add("hide");
    })

    markSelectedTrip(`wagon-${wagonId}`, "wagon", "wagon-selected")

    showElement(`wagon-seat-selector-${tripWagonId}`);
}

export const Seats = React.forwardRef(({
        language, activeTrip, setActiveTrip
}, seatsRef) => {

    if (!activeTrip?.seats) {
        return (<span id="seat-selector-wrapper">{textObject.tripSelectorPrompt[language]}</span>)
    }

    return (
        Object.keys(activeTrip?.seats)?.length > 0

        ?
        <div className="row mt-2" ref={seatsRef} id="seat-selector-wrapper">

                <div className="col-12 d-flex justify-content-center flex-wrap">

                    {/* Wagon selector container */}
                    <div className="wagons-container d-flex flex-row flex-sm-column justify-content-center flex-wrap mx-2">
                        {activeTrip?.seats &&
                            Object.keys(activeTrip.seats).map((wagonId) => {

                                const key = `${activeTrip.tripId}-${wagonId}`;
                                const id = `wagon-${wagonId}`;
                                const className = `d-flex flex-column m-1 p-1 wagon
                                    ${wagonId === Object.keys(activeTrip.seats)[0] ? "wagon-selected" : ""}`;

                                return (
                                    <div
                                        key={key}
                                        id={id}
                                        className={className}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            toggleWagonSeats(`${activeTrip.tripId}-${wagonId}`, wagonId)
                                        }}
                                        style={{maxHeight: "min-content", height: "min-content"}}
                                    >
                                        <span className="text-center my-1">
                                            {wagonId.startsWith("B")
                                                ? textObject.wagonType.bus[language]
                                                : textObject.wagonType.train[language]
                                            }
                                        </span>
                                        <span className="text-center my-1">
                                            ({wagonId})
                                        </span>
                                        <span className="text-center my-1">
                                            {textObject.class[language]}: {activeTrip.seats[wagonId].class}
                                        </span>
                                    </div>
                                )
                            })}
                    </div>
                    {/* End wagon selector container */}

                    {/* Seat selector container */}
                    <div className="wagon-seats-container my-1 mx-2">
                        {activeTrip?.seats &&
                            Object.keys(activeTrip.seats).map((wagonId) => {
                                const seats = activeTrip.seats[wagonId].seats;
                                const wagonClass = activeTrip.seats[wagonId].class;

                                const key = `${activeTrip.tripId}-${wagonId}`
                                const id = `wagon-seat-selector-${activeTrip.tripId}-${wagonId}`
                                const className = `wagon-seat-selector-wrapper
                                    ${wagonId === Object.keys(activeTrip.seats)[0] ? "" : "hide"}`

                                return (
                                    <div
                                        key={key}
                                        id={id}
                                        className={className}
                                    >
                                        {wagonId.startsWith("B")
                                            ? <BusSeats
                                                wagonId={wagonId}
                                                seats={seats}
                                                wagonClass={wagonClass}
                                                activeTrip={activeTrip}
                                                setActiveTrip={setActiveTrip}
                                                />
                                            : <TrainSeats
                                                wagonId={wagonId}
                                                seats={seats}
                                                wagonClass={wagonClass}
                                                activeTrip={activeTrip}
                                                setActiveTrip={setActiveTrip}
                                                />
                                        }
                                    </div>
                                )
                            })}
                    </div>
                    {/* End seat selector container */}

                </div>
        </div>

        :
        <span ref={seatsRef} id="seat-selector-wrapper">
            {textObject.noSeatsSupported[language]}
        </span>
    )
});

Seats.propTypes = {
    language: PropTypes.string.isRequired,
    activeTrip: PropTypes.object.isRequired,
    setActiveTrip: PropTypes.func.isRequired
}
