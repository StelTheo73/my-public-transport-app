import PropTypes from 'prop-types';

import "./BusSeats.css";

const getSeatClass = (seat) => {
    if (seat === "free") {
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
}

export const BusSeats = ({tripId, wagonId, seats}) => {

    const constructSeatsRow = (seatNo) => {

        return (
            <div
            key={`${tripId}-${wagonId}-${seatNo}`}
            className="d-flex mt-2"
            style={{border: "1px solid red"}}
        >
            <div
                className="px-0 d-flex justify-content-between"
                style={{border: "1px solid green"}}
            >
                <span className={`seat-span text-center mx-1 ${getSeatClass(seats[seatNo])}`}>
                    {seatNo}
                </span>
                <span className={`seat-span text-center mx-1 ${getSeatClass(seats[seatNo+1])}`}>
                    {seatNo+1}
                </span>
            </div>
            <div className="px-1">&nbsp;</div>
            <div
                className="px-0 d-flex justify-content-between"
                style={{border: "1px solid green"}}
            >
                <span className={`seat-span text-center mx-1 ${getSeatClass(seats[seatNo+2])}`}>
                    {seatNo+2}
                </span>
                <span className={`seat-span text-center mx-1 ${getSeatClass(seats[seatNo+3])}`}>
                    {seatNo+3}
                </span>
            </div>
        </div>
        )

        // TODO: FIX SEATS OUT OF RANGE
    }

    const constructSeats = () => {
        const seatsLength = Object.keys(seats).length;

        let seatsRows = [];
        for (let seatNo=1; seatNo<=seatsLength; seatNo+=4) {
            seatsRows.push(constructSeatsRow(seatNo));
        }

        return seatsRows;
    }


    return (
    <div
        className="bus-seats-container container border px-1"
    >
        {seats && constructSeats().map((seatsRow) => (
                seatsRow
        ))}

    </div>
  )
}

BusSeats.propTypes = {
    tripId: PropTypes.string.isRequired,
    wagonId: PropTypes.string.isRequired,
    seats: PropTypes.object.isRequired
}
