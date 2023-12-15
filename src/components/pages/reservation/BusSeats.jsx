import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import "./BusSeats.css";

export const BusSeats = ({
    wagonId, seats, wagonClass,
    activeTrip, setActiveTrip
}) => {
    const tripId = activeTrip.tripId;
    const [constructedSeats, setConstructedSeats] = useState([]);

    const getSeatClass = seatNo => {
        const seat = seats[seatNo];

        if (activeTrip.selectedSeats[wagonId].includes(seatNo.toString())) {
            return "seat-user-selected";
        }
        else if (seat === "free") {
            return "seat-free";
        }
        else if (seat === "reserved") {
            return "seat-reserved";
        }
        else if (seat === "selected") {
            return "seat-selected";
        }
        else {
            return "seat-disabled";
        }
    };

    const markSeatSelected = (event) => {
        event.stopPropagation();
        const target = event.target;
        const classList = target.classList;

        const _activeTrip = {...activeTrip};
        if (classList.contains("seat-span")) {
            if (target.classList.contains("seat-user-selected")) {
                target.classList.remove("seat-user-selected");
                target.classList.add("seat-free");
                _activeTrip.selectedSeats[wagonId] = _activeTrip.selectedSeats[wagonId].filter(seatNo =>
                    seatNo !== target.innerText
                );
            }
            else if (classList.contains("seat-free")) {
                target.classList.add("seat-user-selected");
                target.classList.remove("seat-free");

                if (!_activeTrip.selectedSeats[wagonId].includes(target.innerText)) {
                    _activeTrip.selectedSeats[wagonId].push(target.innerText);
                }

            }
        }

        setActiveTrip(_activeTrip);
    };

    const constructSeatsRow = seatNo => {

        return (
            <div
                key={`div-${tripId}-${wagonId}-${seatNo}`}
                className="d-flex mt-2 justify-content-between"
            >
                <div
                    className="px-0 d-flex justify-content-between"
                >
                    <span
                        className={`seat-span text-center me-1 ${getSeatClass(seatNo)}`}
                        onClick={(event) => markSeatSelected(event)}
                    >{seatNo}
                    </span>
                    <span
                        className={`seat-span text-center ${getSeatClass(seatNo+1)}`}
                        onClick={(event) => markSeatSelected(event)}
                    >{seatNo+1}
                    </span>
                </div>
                <div
                    className="px-0 d-flex justify-content-between"
                >
                    <span
                        className={`seat-span text-center me-1 ${getSeatClass(seatNo+2)}`}
                        onClick={(event) => markSeatSelected(event)}
                    >{seatNo+2}
                    </span>
                    <span
                        className={`seat-span text-center ${getSeatClass(seatNo+3)}`}
                        onClick={(event) => markSeatSelected(event)}
                    >{seatNo+3}
                    </span>
                </div>
            </div>
        );
    };

    const constructSingleColumnSeatRow = seatNo => {
        return (
            <div
                key={`div-${tripId}-${wagonId}-${seatNo}`}
                className="d-flex mt-2 justify-content-between"
            >
                <div
                    className="px-0 d-flex justify-content-between"
                >
                    <span
                        className={`seat-span text-center me-1 ${getSeatClass(seatNo)}`}
                        onClick={(event) => markSeatSelected(event)}
                    >{seatNo}
                    </span>
                    <span
                        className={`seat-span text-center ${getSeatClass(seatNo+1)}`}
                        onClick={(event) => markSeatSelected(event)}
                    >{seatNo+1}
                    </span>
                </div>
            </div>
        );
    };

    const constructSeats = () => {
        const LastRowSeats = 5;
        const BackDoorSeat = 21;
        const seatsLength = Object.keys(seats).length;

        const seatsRows = [];
        for (let seatNo=1; seatNo<=seatsLength-LastRowSeats; seatNo+=4) {
            if (seatNo === BackDoorSeat) {
                // Case: Seats next to back door
                seatsRows.push(constructSingleColumnSeatRow(seatNo));
                seatsRows.push(constructSingleColumnSeatRow(seatNo+2));
            }
            else {
                seatsRows.push(constructSeatsRow(seatNo));
            }
        }

        // Add last 5 seats
        seatsRows.push((
            <div className="d-flex my-2" key={`div-${tripId}-${wagonId}-${seatsLength-4}`}>
                <div className="px-0 d-flex justify-content-between">
                    <span
                        className={`seat-span text-center me-1 ${getSeatClass(seatsLength-4)}`}
                        onClick={(event) => {markSeatSelected(event)}}
                    >{seatsLength-4}
                    </span>
                    <span
                        className={`seat-span text-center me-1 ${getSeatClass(seatsLength-3)}`}
                        onClick={(event) => {markSeatSelected(event)}}
                    >{seatsLength-3}
                    </span>
                    <span
                        className={`seat-span text-center me-1 ${getSeatClass(seatsLength-2)}`}
                        onClick={(event) => {markSeatSelected(event)}}
                    >{seatsLength-2}
                    </span>
                    <span
                        className={`seat-span text-center me-1 ${getSeatClass(seatsLength-1)}`}
                        onClick={(event) => {markSeatSelected(event)}}
                    >{seatsLength-1}
                    </span>
                    <span
                        className={`seat-span text-center ${getSeatClass(seatsLength)}`}
                        onClick={(event) => {markSeatSelected(event)}}
                    >{seatsLength}
                    </span>
                </div>
            </div>
        ));

        return seatsRows;
    };

    useEffect(() => {
        setConstructedSeats(constructSeats());
    }, [activeTrip, seats]);

    return (
        <div
            className="bus-seats-container container border px-1"
            key={`${tripId}-${wagonId}`}
        >
            {seats && constructedSeats && constructedSeats.map((seatsRow) => (
                    seatsRow
            ))}

        </div>
  );
;}

BusSeats.propTypes = {
    wagonId: PropTypes.string.isRequired,
    seats: PropTypes.object.isRequired,
    wagonClass: PropTypes.string.isRequired,
    activeTrip: PropTypes.object.isRequired,
    setActiveTrip: PropTypes.func.isRequired
};
