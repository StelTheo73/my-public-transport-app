import PropTypes from "prop-types";

import { useRef } from "react";

import Select from "react-select";

import {
  FaArrowRight, FaHeart,
  FaBus, FaTrain, FaTrashAlt
} from "react-icons/fa";


import { TICKET_CATEGORIES } from "../../../env/constants";
import textObject from "../../../assets/language/passengers.json";
import "./Passengers.css";

const PassengerSeats = ({ language, passenger, allSubTrips }) => {
    const { passengerId, passengerSeats } = passenger;

    return (
      <div className="user-select-disabled">
        {textObject.seats[language]}:&nbsp;
        {passengerSeats?.map(passengerSeat => {
          const subTrip = allSubTrips.find(_subTrip => _subTrip.tripId === passengerSeat?.tripId);

            if (!subTrip) {
                return undefined;
            }

          const vehicleType = subTrip.trainId.startsWith("B") ? "bus" : "train";

          return (

              <div
                key={`passenger-seat-${passengerId}-${passengerSeat?.tripId}-${passengerSeat?.wagonId}-${passengerSeat?.seatNumber}`}
                className="d-flex align-items-center user-select-disabled"
              >
                {vehicleType === "bus" && <FaBus className="vehicle-icon me-1"/>}
                {vehicleType === "train" && <FaTrain className="vehicle-icon me-1"/>}
                <span className="station-names user-select-disabled">
                  {subTrip.startStation[language]} <FaArrowRight className="mx-1"/> {subTrip.arrivalStation[language]}:
                </span>
                &nbsp;
                <span className="passenger-seat user-select-disabled">
                  {(passengerSeat?.seatNumber !== "0" && (
                    <>{passengerSeat?.wagonId}/{passengerSeat?.seatNumber}</>
                  )) || "-"}
                </span>
              </div>
          );
        })}
      </div>
    );
};

const ValidationFields = ({validId, invalidId, text}) => {
  return (
    <>
      <div
        id={validId}
        className="valid-feedback">
          <FaHeart className="text-success"/>
      </div>
      <div
        id={invalidId}
        className="invalid-feedback">
        {text}
      </div>
    </>
  );
};

const getTicketTypeFromValue = value => {
  for (const ticket of TICKET_CATEGORIES) {
      if (value === ticket.value) {
      return ticket;
      }
  }

  return {};
};

export const Passenger = ({
    language,
    passenger,
    allSubTrips,
    handlePassengerNameChange,
    handleTicketTypeChange,
    handleDeletePassenger,
    getTicketPrice,
}) => {
    const ticketTypes = [...TICKET_CATEGORIES].sort((a, b) => a.priority - b.priority);
    const selectRef = useRef(null);

    if (!passenger) {
        return undefined;
    }

    const passengerId = passenger.passengerId;

    for (const ticketType of ticketTypes) {
        ticketType.label = ticketType[language];
    }
    // let defaultTicketType = ticketTypes[0];


    // const defaultTicketType = passengers[passengerId] ?
                            //   getTicketTypeFromValue(passengers[passengerId].ticketTypeName)
                            //   : ticketTypes[0];
    return (
      <div
        key={`passenger-id-${passengerId}`}
        className="border m-3 p-3 passenger-wrapper"
      >

        <div className="d-flex justify-content-between flex-wrap">
          <span className="user-select-disabled">{textObject.passenger[language]} {passengerId+1}</span>
          <span className="passenger-ticket-price user-select-disabled">
            {textObject.ticketPrice[language]}:&nbsp;
              <span>
              {passenger?.ticketPrice &&
                getTicketPrice(passenger.passengerSeats, passenger.ticketType)
              || 0} €
              </span>
          </span>
        </div>

        {/* Passenger name */}
        <div className="mt-2">
          <label
            className="form-label required"
            htmlFor={`passenger-name-${passengerId}`}
            >{textObject.passengerName[language]}
          </label>
          <input
            id={`passenger-name-${passengerId}`}
            className="form-control required"
            required
            value={passenger?.passengerName || ""}
            type="text"
            autoFocus={passengerId === 0}
            onChange={() => handlePassengerNameChange(passengerId)}
            autoComplete="name"
            >
          </input>
        </div>

        <ValidationFields
          validId={`passenger-name-${passengerId}-valid`}
          invalidId={`passenger-name-${passengerId}-invalid`}
          text={textObject.formValidation.passengerNameInvalid[language]}
        />
        {/* End passenger name */}

        {/* Ticket type select */}
        <div className="mt-2">
          <label
            className="form-label required"
            htmlFor={`ticket-type-${passengerId}`}
            >{textObject.ticketType[language]}
          </label>
          <Select
            key={`ticket-type-${passengerId}`}
            id={`ticket-type-${passengerId}`}
            ref={selectRef}
            className="required react-form-select"
            required
            name={`ticket-type-${passengerId}`}
            value={getTicketTypeFromValue(passenger?.ticketTypeName)}
            options={ticketTypes}
            onChange={choice => {handleTicketTypeChange(passengerId, choice);}}
            isSearchable={false}
          />
        </div>

        <ValidationFields
          validId={`ticket-type-${passengerId}-valid`}
          invalidId={`ticket-type-${passengerId}-invalid`}
          text={textObject.formValidation.ticketTypeInvalid[language]}
        />
        {/* End ticket type select */}

        {/* Passenger seats */}
        <div className="mt-2">
          <PassengerSeats
            language={language}
            passenger={passenger || {}}
            allSubTrips={allSubTrips}
          />
        </div>
        {/* End passenger seats */}

        <div className="mt-2 mx-2 d-flex justify-content-end">
          <button
            id={`delete-passenger-${passengerId}`}
            className="btn btn-danger"
            onClick={() => handleDeletePassenger(passengerId)}
          >
          <FaTrashAlt/>
          </button>
        </div>

      </div>
    );
}

Passenger.propTypes = {
    language: PropTypes.string.isRequired,
    passenger: PropTypes.object.isRequired,
    allSubTrips: PropTypes.array.isRequired,
    handlePassengerNameChange: PropTypes.func.isRequired,
    handleTicketTypeChange: PropTypes.func.isRequired,
    handleDeletePassenger: PropTypes.func.isRequired,
    getTicketPrice: PropTypes.func.isRequired,
};

PassengerSeats.propTypes = {
    language: PropTypes.string.isRequired,
    passenger: PropTypes.object.isRequired,
    allSubTrips: PropTypes.array.isRequired,
};

ValidationFields.propTypes = {
    validId: PropTypes.string.isRequired,
    invalidId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
