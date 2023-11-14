import { useEffect, useState, useRef } from "react";

import Select from "react-select";

import "../static/css/Home.css";
import textObject from "../assets/language/home.json";
import Stations from "../database/stations.json";

import { removeTones } from "../utils/removeTones";


function createOptions(station, language) {
      const stationInEnglish = station["EN"];
      return {
            "value": station.id,
            "label": station[language],
            "english": stationInEnglish,
      }
}

const filterOptions = (option, filter) => {
      if (filter === undefined || filter === null) {
            return true;
      }

      if (filter.trim().length === 0) {
            return true;
      }

      const parsedFilter = removeTones(filter.trim()).toLowerCase().replace("ς", "σ");

      const parsedLabel = removeTones(option.label).toLowerCase().replace("ς", "σ");
      const stationInEnglish = option.data.english.toLowerCase();

      if (parsedLabel.includes(parsedFilter)) {
            return true;
      }
      else if (stationInEnglish.includes(parsedFilter)) {
            return true;
      }
      else {
            return false;
      }
}

export const Home = ({language}) => {
      // Form state
      const [start, setStart] = useState("");
      const [destination, setDestination] = useState("");
      const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
      const [returnDate, setReturnDate] = useState(new Date().toISOString().slice(0, 10));
      const [tripType, setTripType] = useState({
            "value": "oneWayTrip",
            "label": textObject.oneWayTrip[language]
      });

      // Create references to form elements
      const selectStartRef = useRef(null);
      const selectDestinationRef = useRef(null);
      const selectTripTypeRef = useRef(null);
      const divReturnDateRef = useRef(null);

      // Station option
      const stations = Object.values(Stations.stations);
      const frequentStations = stations.filter(station => station.frequent === true);
      const options = [
            {
                  "label": textObject.frequentStations[language],
                  "options": frequentStations.map(station => createOptions(station, language))
            },
            {
                  "label": textObject.allStations[language],
                  "options": stations.map(station => createOptions(station, language))
            }
      ];

      // Trip type options
      const tripOptions = [
            {
                  "options": [
                        {
                              "value": "oneWayTrip",
                              "label": textObject.oneWayTrip[language]
                        },
                        {
                              "value": "returningTrip",
                              "label": textObject.returningTrip[language]
                        }
                  ]
            }
      ];

      // Change language of selected options when language changes
      useEffect(() => {
            const startValue = selectStartRef.current.valueOf().props.value;
            const destinationValue = selectDestinationRef.current.valueOf().props.value;
            const tripTypeValue = selectTripTypeRef.current.valueOf().props.value;

            if (startValue?.value) {
                  setStart({
                        "value": startValue.value,
                        "label": Stations.stations[startValue.value][language],
                        "english": Stations.stations[startValue.value].EN
                  });
            }

            if (destinationValue?.value) {
                  setDestination({
                        "value": destinationValue.value,
                        "label": Stations.stations[destinationValue.value][language],
                        "english": Stations.stations[destinationValue.value].EN
                  });
            }

            if (tripTypeValue?.value) {
                  setTripType({
                        "value": tripTypeValue.value,
                        "label": textObject[tripTypeValue.value][language]
                  });
            }

      }, [language])

      // Hide return date selector when trip type is one way trip
      useEffect(() => {
            if (tripType.value === "returningTrip") {
                  divReturnDateRef.current.classList.remove("hide");
                  divReturnDateRef.current.classList.add("d-flex");
            }
            else {
                  divReturnDateRef.current.classList.add("hide");
                  divReturnDateRef.current.classList.remove("d-flex");
            }

      }, [tripType])

      const alternateStartDestination = (event) => {
            const temp = start;
            setStart(destination);
            setDestination(temp);
      }

      // Prevent form submission when pressing enter
      function handleKeyDown(event) {
            if (event.key === "Enter") {
                  event.preventDefault();
            }
      }

      // Handle form submission
      const handleSubmit = (event) => {

            if (start?.value && destination?.value && date && returnDate && tripType?.value) {
                  console.log("All fields are filled");
            }
            else {
                  console.log("Not all fields are filled");
                  return;
            }

            event.preventDefault();
      }



      // const inputs = document.querySelectorAll(".required");
      // inputs.forEach(input => {
      //       input.addEventListener("focus",
      //             function() {
      //                   input.scrollIntoView(false);
      //             })
      // });


      return (
            <main>
                  <div className="container-fluid">
                        <div className="container">
                              <h3>Αναζήτηση Δρομολογίων</h3>
                        </div>
                        <div className="form-wrapper container justify-content-center pt-3 my-3">
                              {/* Form */}
                              <form
                                    className="container"
                                    method="GET"
                                    onKeyDown={(event) => handleKeyDown(event)}
                                    onSubmit={(event) => handleSubmit(event)}>

                                    {/* First row */}
                                    <div className="row">
                                          <div className="form-group col-12 col-sm-6 d-flex justify-content-center flex-column my-2">
                                                <label htmlFor="tripType">{textObject.tripType[language]}</label>
                                                <Select
                                                      className="required"
                                                      required
                                                      isSearchable={false}
                                                      name="tripType"
                                                      id="tripType"
                                                      value={tripType}
                                                      onChange={e => setTripType(e)}
                                                      options={tripOptions}
                                                      ref={selectTripTypeRef}
                                                >
                                                </Select>
                                          </div>

                                    </div>
                                    {/* End first row */}
                                    {/* Second row */}
                                    <div className="row">
                                          {/* Start select */}
                                          <div className="form-group col-12 col-sm-6 d-flex justify-content-center flex-column my-2">
                                                <label htmlFor="start">{textObject.start[language]}</label>
                                                <Select
                                                      className="required"
                                                      required
                                                      name="start"
                                                      id="start"
                                                      isSearchable
                                                      isClearable
                                                      placeholder="-"
                                                      options={options}
                                                      value={start}
                                                      onChange={e => setStart(e)}
                                                      filterOption={filterOptions}
                                                      ref={selectStartRef}
                                                />
                                          </div>
                                          {/* End start select */}
                                          {/* Destination select */}
                                          <div className="form-group col-12 col-sm-6 d-flex justify-content-center flex-column my-2">
                                                <label htmlFor="destination">{textObject.destination[language]}</label>
                                                <Select
                                                      className="required"
                                                      required
                                                      name="destination"
                                                      id="destination"
                                                      isSearchable
                                                      isClearable
                                                      placeholder="-"
                                                      options={options}
                                                      value={destination}
                                                      onChange={e => setDestination(e)}
                                                      filterOption={filterOptions}
                                                      ref={selectDestinationRef}
                                                />
                                          </div>
                                          {/* End destination select */}
                                    </div>
                                    {/* End second row */}
                                    {/* Third row */}
                                    <div className="row">
                                          {/* Date select */}
                                          <div className="form-group col-12 col-sm-6 d-flex justify-content-center flex-column my-2">
                                                <label htmlFor="date">{textObject.date[language]}</label>
                                                <input
                                                      className="form-control required"
                                                      type="date"
                                                      required
                                                      name="date"
                                                      id="date"
                                                      value={date}
                                                      onChange={e => setDate(e.target.value)}
                                                />
                                          </div>
                                          {/* End date select */}
                                          {/* Date select */}
                                          <div className="form-group col-12 col-sm-6 d-flex justify-content-center flex-column my-2"
                                                ref={divReturnDateRef}>
                                                <label htmlFor="returnDate">{textObject.returnDate[language]}</label>
                                                <input
                                                      className="form-control required"
                                                      type="date"
                                                      required
                                                      name="returnDate"
                                                      id="returnDate"
                                                      value={returnDate}
                                                      onChange={e => setReturnDate(e.target.value)}
                                                />
                                          </div>
                                          {/* End date select */}
                                    </div>
                                    {/* End third row */}
                                    {/* Fourth row */}
                                    <div className="row">
                                          <div className="form-group col-12 col-sm-6 d-flex justify-content-center flex-column my-2">
                                                <label>&nbsp;</label>
                                                <button
                                                      className="btn btn-outline-primary"
                                                      onClick={(event) => {event.preventDefault(); alternateStartDestination(event);}}
                                                ><i className="bi bi-arrow-left-right"></i>&nbsp;&nbsp;{textObject.alternate[language]}
                                                </button>
                                          </div>

                                    </div>
                                    {/* End fourth row */}
                                    {/* Fifth row */}
                                    <div className="row pb-3">
                                          <div className="form-group d-flex justify-content-center flex-column my-2">
                                                <input type="submit" className="btn btn-primary" value={textObject.search[language]} />
                                          </div>
                                    </div>
                                    {/* End fifth row */}
                              </form>
                              {/* End form */}
                        </div>
                  </div>
            </main>
      )
}
