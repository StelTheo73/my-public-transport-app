import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import "./TrainSeats.css";

export const TrainSeats = ({
  wagonId, seats, wagonClass,
  activeTrip, setActiveTrip
}) => {
  const tripId = activeTrip.tripId;
  const [constructedSeats, setConstructedSeats] = useState([]);

  const markSeatSelected = (event) => {
    event.stopPropagation();
    const target = event.target;
    const classList = target.classList;

    const _activeTrip = {...activeTrip};
    if (classList.contains("seat-span")) {
      if (target.classList.contains("seat-user-selected")) {
        target.classList.remove("seat-user-selected");
        target.classList.add("seat-free");
        _activeTrip.selectedSeats[wagonId] = _activeTrip.selectedSeats[wagonId].filter((seatNo) => {
          return seatNo !== target.innerText;
        });
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
  }

  const getSeatClass = (seatNo) => {
    const seat = seats[seatNo];

    if (activeTrip.selectedSeats[wagonId].includes(seatNo.toString())) {
        return "seat-user-selected";
    }
    else if (seat.includes("free")) {
        return "seat-free";
    }
    else if (seat.includes("reserved")) {
        return "seat-reserved";
    }
    else if (seat.includes("selected")) {
        return "seat-selected";
    }
    else {
        return "seat-disabled";
    }
  }

  const getSeatOrientation = (seatNo) => {
    const seat = seats[seatNo];

    if (seat.includes("face-back")) {
        return "face-back";
    }
    else {
      return "face-front";
    }

  }

  const constructAClassSeatRow = (seatNo) => {
    return (
      <div
        key={`div-${tripId}-${wagonId}-${seatNo}`}
        className="d-flex ms-5 mt-2 justify-content-between"
      >
        <span
          className={`seat-span text-center mx-1
                      ${getSeatClass(seatNo)}
                      ${getSeatOrientation(seatNo)}`
                    }
          onClick={(event) => markSeatSelected(event)}
        >{seatNo}
        </span>
        <span
          className={`seat-span text-center mx-1
                      ${getSeatClass(seatNo+1)}
                      ${getSeatOrientation(seatNo+1)}`
                    }
          onClick={(event) => markSeatSelected(event)}
        >{seatNo+1}
        </span>
        <span
          className={`seat-span text-center mx-1
                      ${getSeatClass(seatNo+2)}
                      ${getSeatOrientation(seatNo+2)}`
                    }
          onClick={(event) => markSeatSelected(event)}
        >{seatNo+2}
        </span>
      </div>
    )
  }

  const constructBClassSeatRow = (seatNo) => {
    return (
      <div
        key={`div-${tripId}-${wagonId}-${seatNo}`}
        className="d-flex mt-2 justify-content-between"
      >
        <div
          className="d-flex px-0 me-3 justify-content-between"
        >
          <span
            className={`seat-span text-center me-1
                        ${getSeatClass(seatNo)}
                        ${getSeatOrientation(seatNo)}`
                      }
            onClick={(event) => markSeatSelected(event)}
          >{seatNo}
          </span>
          <span
            className={`seat-span text-center
                        ${getSeatClass(seatNo+1)}
                        ${getSeatOrientation(seatNo+1)}`
                      }
              onClick={(event) => markSeatSelected(event)}
          >{seatNo+1}
          </span>
        </div>
        <div
          className="d-flex px-0 ms-3 justify-content-between"
          onClick={(event) => markSeatSelected(event)}
        >
          <span
            className={`seat-span text-center me-1
                        ${getSeatClass(seatNo+2)}
                        ${getSeatOrientation(seatNo+2)}`
                      }
            onClick={(event) => markSeatSelected(event)}
          >{seatNo+2}
          </span>
          <span
            className={`seat-span text-center
                        ${getSeatClass(seatNo+3)}
                        ${getSeatOrientation(seatNo+3)}`
                      }
            onClick={(event) => markSeatSelected(event)}
          >{seatNo+3}
          </span>
        </div>
      </div>
    )
  }

  const constructSeats = () => {
    const seatsLength = Object.keys(seats).length;

    let seatsRows = [];

    if (wagonClass === "A") {
      for (let seatNo=1; seatNo<=seatsLength; seatNo+=3) {
        seatsRows.push(constructAClassSeatRow(seatNo));
      }
    }
    else {
      for (let seatNo=1; seatNo<=seatsLength; seatNo+=4) {
        seatsRows.push(constructBClassSeatRow(seatNo));
      }
    }


    return seatsRows;
  }

  useEffect(() => {
    setConstructedSeats(constructSeats());
  }, [activeTrip, seats]);

  return (
    <div
      className="train-seats-container container border px-1 pb-2"
      key={`${tripId}-${wagonId}`}
    >
      {seats && constructedSeats && constructedSeats.map((seatsRow) => (
        seatsRow
      ))}
    </div>
  )
}

TrainSeats.propTypes = {
  wagonId: PropTypes.string.isRequired,
  seats: PropTypes.object.isRequired,
  wagonClass: PropTypes.string.isRequired,
  activeTrip: PropTypes.object.isRequired,
  setActiveTrip: PropTypes.func.isRequired
}
