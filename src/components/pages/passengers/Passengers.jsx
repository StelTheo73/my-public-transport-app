import PropTypes from "prop-types";

import { useEffect, useState , useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft, FaArrowRight,
} from "react-icons/fa";
import { MdPayment, MdAirlineSeatReclineExtra } from "react-icons/md";

import textObject from "../../../assets/language/passengers.json";
import "./Passengers.css";

import { Passenger } from "./Passenger.jsx";

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
  const [allowAddPassengers, setAllowAddPassengers] = useState(false);
  const [blockAddDelete, setBlockAddDelete] = useState(false);
  const [passengersAfterDeletion, setPassengersAfterDeletion] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

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
   * Calculates the total price for all passengers.
   * @returns {number} - The total price rounded up to 2 decimals.
  */
  const calculateTotalPrice = () => {
    let _totalPrice = 0;

    for (const passenger of Object.values(passengers)) {
      _totalPrice += passenger.ticketPrice;
    }

    // Return total price rounded up to 2 decimals
    return Math.round(_totalPrice * 100) / 100;
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
    newPassengers[passengerId].ticketTypeName = choice.value;

    setPassengers(newPassengers);
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
      const passenger = passengers[passengerId];
      if (!passenger) {
        continue;
      }

      passengersDivArray.push(
        <Passenger
          key={`passenger-id-${passengerId}`}
          language={language}
          passenger={passengers[passengerId]}
          setPassengers={setPassengers}
          handlePassengerNameChange={handlePassengerNameChange}
          handleTicketTypeChange={handleTicketTypeChange}
          handleDeletePassenger={handleDeletePassenger}
          allSubTrips={allSubTrips}
          getTicketPrice={getTicketPrice}
        />
      );
    }
    setPassengersDiv(passengersDivArray);
  };

  /**
   * Deletes a passenger.
   * @param {number} passengerId - The passenger id.
   * @returns {undefined}
  */
  const handleDeletePassenger = passengerId => {
    if (blockAddDelete) {
      return;
    }
    else {
      setBlockAddDelete(true);

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

      // Update the sub trips
      setSubTrips(newSubTrips);
      setReturnSubTrips(newReturnSubTrips);
      setAllSubTrips([...newSubTrips, ...newReturnSubTrips]);

      // Update the number of seats
      const previousNoOfSeats = noOfSeats;

      delete newPassengers[passengerId];
      for (const passenger of Object.values(newPassengers)) {
        if (passenger.passengerId > passengerId) {
          const tempPassenger = newPassengers[passenger.passengerId];
          delete newPassengers[passenger.passengerId];
          tempPassenger.passengerId -= 1;
          newPassengers[tempPassenger.passengerId] = tempPassenger;
        }
      }
      setPassengersAfterDeletion(newPassengers);

      setBlockAddDelete(false);
      // Passengers will be updated with useEffect on seat change
      setNoOfSeats(previousNoOfSeats - 1);
    }
  };

  /**
   * Checks if the provided sub trips support seat selection.
   * If none of the sub trips support seat selection,
   * then user can add passengers from this page.
   * @returns {boolean} - True if the user can add passengers from this page.
   *
   * allSubTrips: An array of sub trips as described below:
   *
   *
   * allSubTrips: [
   *  {
   *  |  tripId: <string>,
   *  |  ...
   *  |  seats: {
   *  |  |  <wagonId>: {
   *  |  |  ...
   *  |  |  },
   *  |  |  <wagonId>: {
   *  |  |  ...
   *  |  |  },
   *  |  |  ...
   *  |  },
   *  },
   *  ...
   *  ]
  */
  const _allowAddPassengers = () => {
    for (const subTrip of allSubTrips) {
      if (Object.keys(subTrip.seats).length !== 0) {
        return false;
      }
    }

    return true;
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
   * subTripsWithSeats: [
   *  [ <seat object>, <seat object>, ... ], --> seats for the first sub trip
   *  [ <seat object>, <seat object>, ... ], --> seats for the second sub trip
   *  [ <seat object>, <seat object>, ... ], --> seats for the third sub trip
   *  ...                                    --> seats for the rest sub trips
   * ]
   *
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
   *  ticketTypeName: <string>,
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

    // Case: The passenger already exists and is marked for deletion
    if (passengersAfterDeletion[passengerId]) {
      return passengersAfterDeletion[passengerId];
    }
    // Case: The passenger already exists and is not marked for deletion
    else if (Object.keys(passengersAfterDeletion).length === 0 && passengers[passengerId]) {
        return passengers[passengerId];
    }
    // Case: The passenger does not exist
    else {
      return {
        passengerId: passengerId,
        passengerName: "",
        // The discount
        ticketType: 0,
        ticketTypeName: "full",
        ticketPrice: getTicketPrice(passengerSeats, 0),
        passengerSeats: passengerSeats,
      };
    }
  };

  /**
   * Creates the passenger objects.
   * @param {number} noOfSeats - The number of seats.
   * @returns {undefined}
   *
   * passengers: An array of passenger objects
   * as described in createPassengerObject.
  */
  const createPassengerObjects = seatsPerWagon => {
    const tempPassengers = {};

    for (let passengerId = 0; passengerId < noOfSeats; passengerId += 1) {
      tempPassengers[passengerId] = createPassengerObject(passengerId, seatsPerWagon);
    }

    setPassengers(tempPassengers);
  };

  const validateForm = () => {
    let formIsValid = true;

    for (const passenger of Object.values(passengers)) {
      console.log(passenger);

      const { passengerId, passengerName, ticketType } = passenger;

      const passengerNameElement = document.getElementById(`passenger-name-${passengerId}`);
      const passengerNameValidElement = document.getElementById(`passenger-name-${passengerId}-valid`);
      const passengerNameInvalidElement = document.getElementById(`passenger-name-${passengerId}-invalid`);

      const ticketTypeElement = document.getElementById(`ticket-type-${passengerId}`);
      const ticketTypeValidElement = document.getElementById(`ticket-type-${passengerId}-valid`);
      const ticketTypeInvalidElement = document.getElementById(`ticket-type-${passengerId}-invalid`);

      if (passengerName.trim().length === 0) {
        formIsValid = false;
        passengerNameElement.classList.add("is-invalid");
        passengerNameElement.classList.remove("is-valid");
        passengerNameValidElement.classList.remove("d-block");
        passengerNameInvalidElement.classList.add("d-block");
      }
      else {
        passengerNameElement.classList.add("is-valid");
        passengerNameElement.classList.remove("is-invalid");
        passengerNameValidElement.classList.add("d-block");
        passengerNameInvalidElement.classList.remove("d-block");
      }

      // Ticket type should be a number between 0 and 1,
      // as it represents the discount
      console.log(ticketType, !ticketType, isNaN(ticketType), ticketType < 0, ticketType > 1);
      if (ticketType === null || isNaN(ticketType) || ticketType < 0 || ticketType > 1) {
        formIsValid = false;
        ticketTypeElement.classList.add("is-invalid");
        ticketTypeElement.classList.remove("is-valid");
        ticketTypeInvalidElement.classList.add("d-block");
        ticketTypeValidElement.classList.remove("d-block");
      }
      else {
        ticketTypeElement.classList.add("is-valid");
        ticketTypeElement.classList.remove("is-invalid");
        ticketTypeValidElement.classList.add("d-block");
        ticketTypeInvalidElement.classList.remove("d-block");
      }

    }

    if (formIsValid) {
      navigate("/payment");
    }
  };

  useEffect(() => {
    if (!subTrips || subTrips.length === 0 || noOfSeats < 0) {
      navigate("/");
    }
    else {
      window.scrollTo(0, 0);

      // Reset passengers on navigate
      setBlockAddDelete(true);
      setPassengers({});
      setBlockAddDelete(false);
    }
  }, [navigate]);


  useEffect(() => {
      if (blockAddDelete) {
        return;
      }
      else {
        const seatsPerWagon = createSeats();
        setAllowAddPassengers(_allowAddPassengers());
        createPassengerObjects(seatsPerWagon);
        setPassengersAfterDeletion({});
      }
    }, [noOfSeats, blockAddDelete]);

    useEffect(() => {
      if (blockAddDelete) {
        return;
      }
      else {
        constructPassengers();
      }
  }, [language, subTrips, returnSubTrips, passengers, blockAddDelete]);

  useEffect(() => {
    if (blockAddDelete) {
      return;
    }
    else {
      setTotalPrice(calculateTotalPrice());
    }
  }, [passengers, blockAddDelete]);

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

        {/* Total price */}

        <div className="container d-flex align-items-center justify-content-end">
            <span className="h5 user-select-disabled">{textObject.totalCost[language]}:&nbsp;
              <span className="h3 text-primary-bold user-select-disabled">{totalPrice} €</span>
            </span>
          </div>

        {/* Add passenger */}
        {allowAddPassengers &&
          <div className="container d-flex justify-content-end mt-1">
            <button
              className="btn btn-outline-primary mt-1"
              onClick={() => {
                while (blockAddDelete) {
                  continue;
                }
                setNoOfSeats(noOfSeats + 1);
              }}
            >{textObject.addPassenger[language]}
            </button>
          </div>
        }
        {/* End add passenger */}

        {!noOfSeats &&
          <div className="d-flex flex-column align-items-center justify-content-center my-5">
            <span>{textObject.noSeatsSelected[language]}</span>
            <button
              className="btn btn-warning mt-1"
              onClick={() => navigate("/reservation")}
            >{textObject.returnToSeatSelection[language]}
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
