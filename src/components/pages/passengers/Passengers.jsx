import PropTypes from "prop-types"

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Select from "react-select";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaPersonHalfDress } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { ContactForm } from "./ContactForm.jsx";

import { TICKET_CATEGORIES } from "../../../env/constants";
import textObject from "../../../assets/language/passengers.json";
import "./Passengers.css";

export const Passengers = ({
  language,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [passengersDiv, setPassengersDiv] = useState([]);
  const [passengers, setPassengers] = useState({});

  const handlePassengerNameChange = (passengerId) => {
    const passengerName = document.getElementById(`passenger-name-${passengerId}`).value;
    const newPassengers = {...passengers};

    if (newPassengers[passengerId]?.passengerName) {
      newPassengers[passengerId].passengerName = passengerName;
    }
    else {
      newPassengers[passengerId] = {
        passengerId: passengerId,
        passengerName: passengerName,
        ticketType: ""
      }
    }

    setPassengers(newPassengers);
  }

  const handleTicketTypeChange = (passengerId) => {
    const ticketType = document.getElementById(`ticket-type-${passengerId}`).value;
    const newPassengers = {...passengers};

    if (newPassengers[passengerId]?.ticketType) {
      newPassengers[passengerId].ticketType = ticketType;
    }
    else {
      newPassengers[passengerId] = {
        passengerId: passengerId,
        passengerName: "",
        ticketType: ""
      }
    }

    setPassengers(newPassengers);
  }

  const constructPassengerElement = (passengerId) => {
    const ticketTypes = TICKET_CATEGORIES.sort((a, b) => {return a.priority - b.priority});

    for (const ticketType of ticketTypes) {
      ticketType.label = ticketType[language];
    }

    return (
      <div
        key={`passenger-id-${passengerId}`}
        className="border m-3 p-3 passenger-wrapper"
      >
        <span>{textObject.passenger[language]} {passengerId+1}</span>

        <div className="mt-1">
          <label
            className="form-label required"
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
            >{textObject.ticketType[language]}
          </label>
          <Select
            id={`ticket-type-${passengerId}`}
            className="required"
            required
            name={`ticket-type-${passengerId}`}
            defaultValue={ticketTypes[0]}
            options={ticketTypes}
            onChange={() => handleTicketTypeChange(passengerId)}
            isSearchable={false}
          />
        </div>
      </div>
    )
  }

  const constructPassengers = (noOfSeats) => {
    // Array containing the divs for each passenger
    const passengersDivsArray = [];

    for (let passengerId = 0; passengerId < noOfSeats; passengerId += 1) {
      passengersDivsArray.push(constructPassengerElement(passengerId, noOfSeats));
    }
    setPassengersDiv(passengersDivsArray);
  }

  const validateForm = () => {
    console.log("VALIDATE PASSENGERS FORM");
  }

  useEffect(() => {
    if (!location.state?.subTrips || location.state?.noOfSeats === null ||
        location.state?.noOfSeats < 0 || isNaN(location.state?.noOfSeats)
      ) {
      navigate("/");
    }

    const subTrips = location.state.subTrips;
    const noOfSeats = location.state.noOfSeats === 0 ? 1 : location.state.noOfSeats;

    window.scrollTo(0, 0);

    constructPassengers(noOfSeats);

  }, [navigate, location.state]);

  useEffect(() => {

    const noOfSeats = location.state.noOfSeats === 0 ? 1 : location.state.noOfSeats;
    constructPassengers(noOfSeats);

  }, [language]);

  return (
    <main>
        {/* Navigation buttons */}
        <div className="container-fluid sticky-container">
            <div className="row">
                <div className="col-12 col-sm-6 d-flex justify-content-start">
                    <button
                        className="btn btn-warning mt-2 mt-sm-1 full-width-xs"
                        onClick={() => {
                            navigate("/reservation")
                        }}
                    >
                        <FaArrowLeft className="me-2"/>
                        <span>
                            {textObject.passengers[language]}
                        </span>
                        <FaPersonHalfDress className="ms-2"/>
                    </button>
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-end">
                    <button
                        id="reservation-btn"
                        className="btn btn-success mt-2 mt-sm-1 full-width-xs"
                        onClick={() => {
                            validateForm();
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

        {/* Contact info header */}
        <div className="container d-flex align-items-center justify-content-center mt-3">
            <h3 id="page-header">{textObject.contactInfo[language]}</h3>
        </div>
        {/* End contact info header */}


        {/* Contact info */}
        <ContactForm language={language} textObject={textObject}/>

    </main>
  )
}

Passengers.propTypes = {
  language: PropTypes.string.isRequired
}
