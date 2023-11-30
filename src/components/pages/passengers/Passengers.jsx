import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";

import {
  FaArrowLeft, FaArrowRight,
  FaBus, FaTrain, FaTrashAlt
} from "react-icons/fa";
import { MdPayment, MdAirlineSeatReclineExtra } from "react-icons/md";

import { TICKET_CATEGORIES } from "../../../env/constants";
import textObject from "../../../assets/language/passengers.json";
import "./Passengers.css";


const PassengerSeats = ({ language, passenger, allSubTrips }) => {
  const { passengerId, passengerSeats } = passenger;

  return (
    <div>
      {textObject.seats[language]}:&nbsp;
      {passengerSeats?.map(passengerSeat => {
        const subTrip = allSubTrips.find(_subTrip => _subTrip.tripId === passengerSeat?.tripId);
        const vehicleType = subTrip.trainId.startsWith("B") ? "bus" : "train";

        return (
          passengerSeat?.seatNumber !== "0" && (
            <div
              key={`passenger-seat-${passengerId}-${passengerSeat?.tripId}-${passengerSeat?.wagonId}-${passengerSeat?.seatNumber}`}
              className="d-flex align-items-center"
            >
              {vehicleType === "bus" && <FaBus className="vehicle-icon me-1"/>}
              {vehicleType === "train" && <FaTrain className="vehicle-icon me-1"/>}
              <span className="station-names">
                {subTrip.startStation[language]} <FaArrowRight className="mx-1"/> {subTrip.arrivalStation[language]}:
              </span>
              &nbsp;
              <span className="passenger-seat">
                {passengerSeat?.wagonId}/
                {passengerSeat?.seatNumber}
              </span>
            </div>
          )
        );
      })}
    </div>
  );
};

export const Passengers = ({
  language,
  subTrips, setSubTrips,
  returnSubTrips, setReturnSubTrips,
  passengers, setPassengers,
  noOfSeats, setNoOfSeats
}) => {
  const navigate = useNavigate();
  const [allSubTrips, setAllSubTrips] = useState([...subTrips, ...returnSubTrips]);
  const [passengersDiv, setPassengersDiv] = useState([]);

  /**
   * Calculates the ticket price for a passenger.
   * @param {Object[]} passengerSeats - An array of seat objects.
   * @param {number} passengerSeats[].seatNumber - The seat number.
   * @param {number} passengerSeats[].basicCost - The basic cost of the seat.
   * @param {number} discount - The discount for the ticket type (between 0 and 1).
   * @returns {number} - The ticket price rounded up to 2 decimals.
  */
  const getTicketPrice = (passengerSeats, discount) => {
    let ticketPrice = 0;

    // Iterate through the passenger seats and calculate the ticket price for each seat
    for (const passengerSeat of passengerSeats) {
        // Also apply the discount
        ticketPrice += passengerSeat.basicCost * (1 - discount);
    }

    // Return ticket price rounded up to 2 decimals
    return Math.round(ticketPrice * 100) / 100;
  };

  /**
   * Handles the change of the passenger name.
   * @param {number} passengerId - The passenger id.
   * @returns {undefined}
  */
  const handlePassengerNameChange = passengerId => {
    const passengerName = document.getElementById(`passenger-name-${passengerId}`).value;
    const newPassengers = {...passengers};

    // Change the passenger name
    newPassengers[passengerId].passengerName = passengerName;

    setPassengers(newPassengers);
  };

  /**
   * Handles the change of the ticket type.
   * @param {number} passengerId - The passenger id.
   * @param {Object} choice - The selected ticket type.
   * @param {number} choice.discount - The discount for the ticket type (between 0 and 1).
   * @returns {undefined}
  */
  const handleTicketTypeChange = (passengerId, choice) => {
    const newPassengers = {...passengers};
    const passengerSeats = newPassengers[passengerId].passengerSeats;

    // Change the ticket type (i.e. the discount)
    newPassengers[passengerId].ticketType = choice.discount;
    //  Calculate the new ticket price
    newPassengers[passengerId].ticketPrice = getTicketPrice(passengerSeats, choice.discount);

    setPassengers(newPassengers);
  };

  /**
   * Constructs the passenger element.
   * @param {number} passengerId - The passenger id.
   * @returns {JSX.Element} - The passenger element.
  */
  const constructPassengerElement = passengerId => {
    const ticketTypes = [...TICKET_CATEGORIES].sort((a, b) => a.priority - b.priority);

    for (const ticketType of ticketTypes) {
      ticketType.label = ticketType[language];
    }
    const defaultTicketType = ticketTypes[0];

    return (
      <div
        key={`passenger-id-${passengerId}`}
        className="border m-3 p-3 passenger-wrapper"
      >

        <div className="d-flex justify-content-between flex-wrap">
          <span>{textObject.passenger[language]} {passengerId+1}</span>
          <span className="passenger-ticket-price">
            {textObject.ticketPrice[language]}:&nbsp;
              <span>
              {passengers[passengerId]?.ticketPrice &&
                getTicketPrice(passengers[passengerId].passengerSeats, passengers[passengerId].ticketType)
              || 0} €
              </span>
          </span>
        </div>

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
            type="text"
            autoFocus={passengerId === 0}
            onChange={() => handlePassengerNameChange(passengerId)}
            autoComplete="name"
            >
          </input>
        </div>

        <div className="mt-2">
          <label
            className="form-label required"
            htmlFor={`ticket-type-${passengerId}`}
            value={passengers[passengerId]?.passengerName || ""}
            >{textObject.ticketType[language]}
          </label>
          <Select
            id={`ticket-type-${passengerId}`}
            className="required"
            required
            name={`ticket-type-${passengerId}`}
            defaultValue={defaultTicketType}
            options={ticketTypes}
            onChange={choice => handleTicketTypeChange(passengerId, choice)}
            isSearchable={false}
          />
        </div>
        <div className="mt-2">
          <PassengerSeats
            language={language}
            passenger={passengers[passengerId] || {}}
            allSubTrips={allSubTrips}
          />
        </div>

        <div className="mt-2 mx-2 d-flex justify-content-end">
          <button
            id={`delete-passenger-${passengerId}`}
            className="btn btn-danger"
            onClick={() => handleDeletePassenger(passengerId)}
          >
          <FaTrashAlt className="me-1"/>
          </button>
        </div>

      </div>
    );
  };

  /**
   * Constructs the elements where the passengers are displayed.
   * @param {number} noOfSeats - The number of seats.
   * @returns {undefined}
  */
  const constructPassengers = () => {
    const passengersDivArray = [];

    // Construct a passenger element for each passenger
    for (let passengerId = 0; passengerId < noOfSeats; passengerId += 1) {
      passengersDivArray.push(constructPassengerElement(passengerId));
    }
    setPassengersDiv(passengersDivArray);
  };

  /**
   * Deletes a passenger.
   * @param {number} passengerId - The passenger id.
   * @returns {undefined}
  */
  const handleDeletePassenger = passengerId => {
    const newPassengers = { ...passengers };
    const newSubTrips = [...subTrips];
    const newReturnSubTrips = [...returnSubTrips];

    const passengerSeats = newPassengers[passengerId].passengerSeats;

    // Delete the seats from the sub trips
    for (const { tripId, wagonId, seatNumber } of passengerSeats) {
      const subTrip = newSubTrips.find(_subTrip => _subTrip.tripId === tripId);

      if (!subTrip) {
        continue;
      }

      const wagons = Object.keys(subTrip.selectedSeats);
      // Case: This vehicle does not support seat selection ||
      //       the wagon does not belong to this vehicle
      if (wagons.length === 0 || !wagons.includes(wagonId)) {
        continue;
      }

      // Case: The seat does not belong to this wagon
      const seats = subTrip.selectedSeats[wagonId];
      if (seats.length === 0 || !seats.includes(seatNumber)) {
        continue;
      }

      // Delete the seat
      for (const newSubTrip of newSubTrips) {
        if (newSubTrip.tripId === tripId) {
          newSubTrip.selectedSeats[wagonId] = seats.filter(_seatNumber => _seatNumber !== seatNumber);
        }
      }
    }

    // Delete the seats from the return sub trips
    for (const { tripId, wagonId, seatNumber } of passengerSeats) {
      const subTrip = newReturnSubTrips.find(_subTrip => _subTrip.tripId === tripId);

      if (!subTrip) {
        continue;
      }

      const wagons = Object.keys(subTrip.selectedSeats);
      // Case: This vehicle does not support seat selection ||
      //       the wagon does not belong to this vehicle
      if (wagons.length === 0 || !wagons.includes(wagonId)) {
        continue;
      }

      // Case: The seat does not belong to this wagon
      const seats = subTrip.selectedSeats[wagonId];
      if (seats.length === 0 || !seats.includes(seatNumber)) {
        continue;
      }

      // Delete the seat
      for (const newSubTrip of newReturnSubTrips) {
        if (newSubTrip.tripId === tripId) {
          newSubTrip.selectedSeats[wagonId] = seats.filter(_seatNumber => _seatNumber !== seatNumber);
        }
      }
    }

    // Delete the passenger
    delete newPassengers[passengerId];

    // Update the sub trips
    setSubTrips(newSubTrips);
    setReturnSubTrips(newReturnSubTrips);
    setAllSubTrips([...newSubTrips, ...newReturnSubTrips]);

    // Update the number of seats
    const previousNoOfSeats = noOfSeats;
    setNoOfSeats(previousNoOfSeats - 1);

    // Passengers will be updated with useEffect on seat change
  };

  /**
   * Creates the seats.
   * @param {number} noOfSeats - The number of seats.
   * @returns {Object[]} - An array of seat objects.
   * @returns {string} - An array of seat objects[].tripId.
   * @returns {string} - An array of seat objects[].seatNumber.
   * @returns {string} - An array of seat objects[].wagonId.
   * @returns {number} - An array of seat objects[].basicCost.
   *
   * seat object: {
   *  tripId: <string>,
   *  seatNumber: <string>,
   *  wagonId: <string>
   *  basicCost: <number>,
   * }
  */
  const createSeats = () => {
    const subTripsWithSeats = [];

    for (const subTrip of allSubTrips) {
      const seatsPerWagon = subTrip.selectedSeats;
      const tripSeats = [];


      // Case: This vehicle does not support seat selection
      if (Object.keys(seatsPerWagon).length === 0) {

        for (let i = 0; i < noOfSeats; i += 1) {
          tripSeats.push({
            tripId: subTrip.tripId,
            seatNumber: "0",
            wagonId: "0",
            basicCost: subTrip.basicCost,
          });
        }

      }
      else {

        for (const wagonId of Object.keys(seatsPerWagon)) {
          for (const seatNumber of seatsPerWagon[wagonId]) {
            tripSeats.push({
              tripId: subTrip.tripId,
              seatNumber: seatNumber,
              wagonId: wagonId,
              basicCost: subTrip.seats[wagonId].basicCost,
            });
          }
        }

      }

      subTripsWithSeats.push(tripSeats);
    }

    return subTripsWithSeats;
  };

  /**
   * Creates the passenger object.
   * @param {number} passengerId - The passenger id.
   * @param {Object[]} seatsPerWagon - An array of seat objects.
   * @param {number} seatsPerWagon[].seatNumber - The seat number.
   * @param {number} seatsPerWagon[].basicCost - The basic cost of the seat.
   * @returns {Object} - The passenger object.
   * @returns {number} - The passenger object.passengerId.
   * @returns {string} - The passenger object.passengerName.
   * @returns {number} - The passenger object.ticketType.
   * @returns {number} - The passenger object.ticketPrice.
   *
   * passenger object: {
   *  passengerId: <number>,
   *  passengerName: <string>,
   *  ticketType: <number>,
   *  ticketPrice: <number>,
   *  passengerSeats: <Object[]> - An array of seat objects as described below.
   * }
   *
   *  passengerSeats: [
   *    {
   *      tripId: <string>,
   *      seatNumber: <string>,
   *      wagonId: <string>,
   *      basicCost: <number>,
   *   },
   *   ...
   *  ]
  */
  const createPassengerObject = (passengerId, seatsPerWagon) => {
    const passengerSeats = [];

    for (const wagonSeats of seatsPerWagon) {
      passengerSeats.push(wagonSeats[passengerId]);
    }

    return {
      passengerId: passengerId,
      passengerName: "",
      // The discount
      ticketType: 0,
      ticketPrice: getTicketPrice(passengerSeats, 0),
      passengerSeats: passengerSeats
    };

  };

  /**
   * Creates the passenger objects.
   * @param {number} noOfSeats - The number of seats.
   * @returns {undefined}
   *
   * passengers: An array of passenger objects
   * as described in createPassengerObject.
  */
  const createPassengerObjects = () => {
    const tempPassengers = {};
    const seatsPerWagon = createSeats();

    for (let passengerId = 0; passengerId < noOfSeats; passengerId += 1) {
      tempPassengers[passengerId] = createPassengerObject(passengerId, seatsPerWagon);
    }

    setPassengers(tempPassengers);
  };

  const validateForm = () => {

    for (const passenger of Object.values(passengers)) {
      console.log(passenger);
      if (passenger.passengerName.trim().length === 0) {
        console.log(passenger.passengerId, "EMPTY NAME");
      }




      // ticket type should be a number between 0 and 1
      // check the ticket type type with typeof, it should be a number
      // check the ticket type value with >= 0 and <= 1

      if (passenger.ticketType < 0 || passenger.ticketType > 1) {
        console.log("INVALID TICKET TYPE");
      }

    }

    // console.log(passengers);
    console.log("VALIDATE PASSENGERS FORM");
  };

  useEffect(() => {
    if (!subTrips || subTrips.length === 0 || noOfSeats < 0) {
      navigate("/");
    }
    else {
      window.scrollTo(0, 0);

      createPassengerObjects();
    }

  }, [navigate, noOfSeats]);

  useEffect(() => {

    if (!subTrips || subTrips.length === 0 || noOfSeats < 0) {
      navigate("/");
    }
    else {
      // createPassengerObjects();
      constructPassengers();
    }

  }, [language, subTrips, returnSubTrips, passengers]);

  return (
    <main>

        {/* Navigation buttons */}
        <div className="container-fluid sticky-container">
            <div className="row">
                <div className="col-12 col-sm-6 d-flex justify-content-start">
                    <button
                        className="btn btn-warning mt-2 mt-sm-1 full-width-xs"
                        onClick={() => { navigate("/reservation");}}
                      >
                        <FaArrowLeft className="me-2"/>
                        <span>
                            {textObject.seats[language]}
                        </span>
                    <MdAirlineSeatReclineExtra className="ms-2"/>
                    </button>
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-end">
                    <button
                        id="reservation-btn"
                        className="btn btn-success mt-2 mt-sm-1 full-width-xs"
                        onClick={() => {
                            validateForm();
                            // navigate("/payment");
                        }}
                    >
                        <MdPayment className="mb-1 me-2"/>
                        <span>
                          {textObject.payment[language]}
                        </span>
                        <FaArrowRight className="ms-2"/>
                    </button>
                </div>
            </div>
        </div>
        {/* End navigation buttons */}

        {/* Header */}
        <div className="container d-flex align-items-center justify-content-center mt-3">
            <h3 id="page-header">{textObject.header[language]}</h3>
        </div>
        {/* End header */}

        {!noOfSeats &&
          <div className="d-flex flex-column align-items-center justify-content-center my-5">
            <span>Δεν έχετε επιλέξει καμία θέση!</span>
            <button
              className="btn btn-warning mt-1"
              onClick={() => navigate("/reservation")}
            >Επιστροφή στην επιλογή θέσεων
            </button>

          </div>
        }

        {noOfSeats > 0 &&
          <div
            className="d-flex justify-content-between flex-wrap"
          >
            {passengersDiv && passengersDiv.map(passengersDiv => (passengersDiv))}
          </div>
        }
    </main>
  );
};

Passengers.propTypes = {
  language: PropTypes.string.isRequired,
  subTrips: PropTypes.array.isRequired,
  setSubTrips: PropTypes.func.isRequired,
  returnSubTrips: PropTypes.array.isRequired,
  setReturnSubTrips: PropTypes.func.isRequired,
  passengers: PropTypes.object.isRequired,
  setPassengers: PropTypes.func.isRequired,
  noOfSeats: PropTypes.number.isRequired,
  setNoOfSeats: PropTypes.func.isRequired,
};

PassengerSeats.propTypes = {
  language: PropTypes.string.isRequired,
  passenger: PropTypes.object.isRequired,
  allSubTrips: PropTypes.array.isRequired,
};
