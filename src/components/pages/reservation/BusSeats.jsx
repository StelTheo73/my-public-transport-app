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
            className="d-flex mt-2 justify-content-between"
            style={{border: "1px solid red"}}
        >
            <div
                className="px-0 d-flex justify-content-between"
                style={{border: "1px solid green"}}
            >
                <span className={`seat-span text-center me-1 ${getSeatClass(seats[seatNo])}`}>
                    {seatNo}
                </span>
                <span className={`seat-span text-center ${getSeatClass(seats[seatNo+1])}`}>
                    {seatNo+1}
                </span>
            </div>
            <div
                className="px-0 d-flex justify-content-between"
                style={{border: "1px solid green"}}
            >
                <span className={`seat-span text-center me-1 ${getSeatClass(seats[seatNo+2])}`}>
                    {seatNo+2}
                </span>
                <span className={`seat-span text-center ${getSeatClass(seats[seatNo+3])}`}>
                    {seatNo+3}
                </span>
            </div>
        </div>
        )

    }

    const constructSeats = () => {
        const seatsLength = Object.keys(seats).length;

        let seatsRows = [];
        for (let seatNo=1; seatNo<=seatsLength-8; seatNo+=4) {
            seatsRows.push(constructSeatsRow(seatNo));
        }

        // Add 5 last seats
        seatsRows.push((
            <div className="d-flex my-2">
                <div className="px-0 d-flex justify-content-between">
                    <span className={`seat-span text-center me-1 ${getSeatClass(seats[41])}`}>
                        {41}
                    </span>
                    <span className={`seat-span text-center me-1 ${getSeatClass(seats[42])}`}>
                        {42}
                    </span>
                    <span className={`seat-span text-center me-1 ${getSeatClass(seats[43])}`}>
                        {43}
                    </span>
                    <span className={`seat-span text-center me-1 ${getSeatClass(seats[44])}`}>
                        {44}
                    </span>
                    <span className={`seat-span text-center ${getSeatClass(seats[45])}`}>
                        {45}
                    </span>
                </div>
            </div>
        ))

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
