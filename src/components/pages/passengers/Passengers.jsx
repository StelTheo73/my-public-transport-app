import PropTypes from "prop-types"

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Select from "react-select";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdPayment, MdAirlineSeatReclineExtra } from "react-icons/md";

import { TICKET_CATEGORIES } from "../../../env/constants";
import textObject from "../../../assets/language/passengers.json";
import "./Passengers.css";

export const Passengers = ({
  language, subTrips, returnSubTrips,
  passengers, setPassengers,
  noOfSeats, setNoOfSeats
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allSubTrips, setAllSubTrips] = useState([...subTrips, ...returnSubTrips]);
  const [passengersDiv, setPassengersDiv] = useState([]);
  // const [passengers, setPassengers] = useState({});

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

        <div className="mt-1">
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

        <div className="mt-1">
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
            <span className="passenger-seat-numbers">Θέσεις:&nbsp;<span>{
                passengers[passengerId]?.passengerSeats &&
                passengers[passengerId].passengerSeats.map((passengerSeat, index) => {
                  return (
                    passengerSeat.seatNumber !== "0" &&
                      <span
                        key={`passenger-seat-${passengerId}-${passengerSeat.tripId}-${passengerSeat.wagonId}-${passengerSeat.seatNumber}`}>
                        {passengerSeat.seatNumber}
                        {index < passengers[passengerId].passengerSeats.length - 1 && ", "}
                      </span>
                );})}</span>
            </span>
        </div>

      </div>
    );
  };

  /**
   * Constructs the elements where the passengers are displayed.
   * @param {number} noOfSeats - The number of seats.
   * @returns {undefined}
  */
  const constructPassengers = noOfSeats => {
    const passengersDivsArray = [];

    // Construct a passenger element for each passenger
    for (let passengerId = 0; passengerId < noOfSeats; passengerId += 1) {
      passengersDivsArray.push(constructPassengerElement(passengerId));
    }
    setPassengersDiv(passengersDivsArray);
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
  const createSeats = noOfSeats => {
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
  const createPassengerObjects = noOfSeats => {
    const tempPassengers = {};
    const seatsPerWagon = createSeats(noOfSeats);

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

      createPassengerObjects(noOfSeats);
    }

  }, [navigate]);

  useEffect(() => {

    if (!subTrips || subTrips.length === 0 || noOfSeats < 0) {
      navigate("/");
    }
    else {
      constructPassengers(noOfSeats);
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
                            {textObject.reservation[language]}
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

        <div
          className="d-flex justify-content-between flex-wrap"
        >
          {passengersDiv && passengersDiv.map((passengersDiv) => (passengersDiv))}
        </div>
    </main>
  );
};

Passengers.propTypes = {
  language: PropTypes.string.isRequired,
  subTrips: PropTypes.array.isRequired,
  returnSubTrips: PropTypes.array.isRequired,
  passengers: PropTypes.object.isRequired,
  setPassengers: PropTypes.func.isRequired,
  noOfSeats: PropTypes.number.isRequired,
  setNoOfSeats: PropTypes.func.isRequired,
};
