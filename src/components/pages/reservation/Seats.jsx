import React from "react";
import PropTypes from "prop-types";

import { BusSeats } from "./BusSeats";

import { markSelectedTrip, showElement } from "../../../utils/commonFunctionsDOM";
import "./Seats.css";

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
        return (<span>Παρακαλώ επιλέξτε μία διαδρομή για να εμφανιστούν οι διαθέσιμες θέσεις</span>)
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
                                    >
                                        <span className="text-center my-1">
                                            {wagonId.startsWith("B") ? "Λεωφ.": "Βαγόνι"}
                                        </span>
                                        <span className="text-center my-1">
                                            ({wagonId})
                                        </span>
                                        <span className="text-center my-1">
                                            Κλάση: {activeTrip.seats[wagonId].class}
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
                                // console.log(wagonId)
                                const seats = activeTrip.seats[wagonId].seats;

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
                                                activeTrip={activeTrip}
                                                setActiveTrip={setActiveTrip}
                                                />
                                            : <span>Traino {activeTrip.tripId} - {wagonId}</span>
                                        }
                                    </div>
                                )
                            })}
                    </div>
                    {/* End seat selector container */}

                </div>
        </div>

        :
        <span ref={seatsRef} id="seat-selector-wrapper">Αυτό το όχημα δεν υποστηρίζει κράτηση θέσεων</span>
    )
});

Seats.propTypes = {
    language: PropTypes.string.isRequired,
    activeTrip: PropTypes.object.isRequired,
    setActiveTrip: PropTypes.func.isRequired
}
