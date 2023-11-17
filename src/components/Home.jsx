import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";

import { useFetch } from "../hooks/useFetch";

import "../static/css/Home.css";
import textObject from "../assets/language/home.json";

import { removeTones } from "../utils/removeTones";


function createOptions(station, language) {
      const stationInEnglish = station["EN"];
      return {
            "value": station.id,
            "label": station[language],
            "english": stationInEnglish
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

export const Home = ({
      language,
      searchParameters, setSearchParameters,
      setStations
      }) => {

      const navigate = useNavigate();

      // Fetch stations
      const [url, setUrl] = useState("");
      const { data: Stations, loading, error } = useFetch(url);

      useEffect(() => {
            setUrl("/fetch/stations");
      }, [navigate])

      useEffect(() => {
            setStations(Stations);
      }, [Stations, setStations])
      // End fetch stations

      // Form state
      console.log(searchParameters?.start)
      const [start, setStart] =
            useState(searchParameters?.start || "");
      const [destination, setDestination] =
            useState(searchParameters?.destination || "");
      const [date, setDate] =
            useState(searchParameters?.date || new Date().toISOString().slice(0, 10));
      const [returnDate, setReturnDate] =
            useState(searchParameters?.returnDate || new Date().toISOString().slice(0, 10));
      const [tripType, setTripType] =
            useState(searchParameters?.tripType ||
                  {
                        "value": "oneWayTrip",
                        "label": textObject.oneWayTrip[language]
                  }
            );

      // Create references to form elements
      const selectStartRef = useRef(null);
      const selectDestinationRef = useRef(null);
      const selectTripTypeRef = useRef(null);
      const divReturnDateRef = useRef(null);

      // Station options
      const stations = Stations?.stations ? Object.values(Stations.stations) : [];
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

      // Change language of selected options when language changes or when navigating back to home page
      useEffect(() => {
            const startValue = selectStartRef.current.valueOf().props.value;
            const destinationValue = selectDestinationRef.current.valueOf().props.value;
            const tripTypeValue = selectTripTypeRef.current.valueOf().props.value;

            if (startValue?.value && Stations?.stations) {
                  setStart({
                        "value": startValue.value,
                        "label": Stations.stations[startValue.value][language],
                        "english": Stations.stations[startValue.value].EN
                  });
            }

            if (destinationValue?.value && Stations?.stations) {
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

      }, [language, Stations?.stations, navigate])

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

      // Alternate start and destination stations
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
            }

            setSearchParameters({
                  start: start.valueOf(),
                  destination: destination.valueOf(),
                  date: date.valueOf(),
                  returnDate: returnDate.valueOf(),
                  tripType: tripType.valueOf()
            })

            event.preventDefault();

            navigate("/trips", {
                  language: language,
                  searchParameters: searchParameters
                });
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
                        <div className="container d-flex align-items-center justify-content-center">
                              <h3>{textObject.header[language]}</h3>
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

Home.propTypes = {
      language: PropTypes.string.isRequired,
      searchParameters: PropTypes.object.isRequired,
      setSearchParameters: PropTypes.func.isRequired,
      setStations: PropTypes.func.isRequired
}
