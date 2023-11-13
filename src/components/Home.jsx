import { useState } from "react";

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
      const [start, setStart] = useState("");
      const [destination, setDestination] = useState("");
      const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
      const [tripType, setTripType] = useState({
            "value": "one-way",
            "label": textObject.oneWayTrip[language]
      });

      const stations = Stations["stations"];
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

      const tripOptions = [
            {
                  "options": [
                        {
                              "value": "one-way",
                              "label": textObject.oneWayTrip[language]
                        },
                        {
                              "value": "returning",
                              "label": textObject.returningTrip[language]
                        }
                  ]
            }
      ];

      return (
            <main>
                  <div className="container-fluid">
                        <div className="container">
                              <h3>Αναζήτηση Δρομολογίων</h3>
                        </div>
                        <div className="form-wrapper container justify-content-center my-3">
                              {/* Form */}
                              <form className="container">
                                    {/* First row */}
                                    <div className="row pt-3">
                                          {/* Start select */}
                                          <div className="form-group col-12 col-sm-6 d-flex justify-content-center flex-column my-2">
                                                <label htmlFor="start">{textObject.start[language]}</label>
                                                <Select
                                                      className="required"
                                                      required
                                                      name="start"
                                                      isSearchable
                                                      isClearable
                                                      autoFocus
                                                      placeholder="-"
                                                      options={options}
                                                      value={start}
                                                      onChange={e => setStart(e)}
                                                      filterOption={filterOptions}
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
                                                      isSearchable
                                                      isClearable
                                                      placeholder="-"
                                                      options={options}
                                                      value={destination}
                                                      onChange={e => setDestination(e)}
                                                      filterOption={filterOptions}
                                                />
                                          </div>
                                          {/* End destination select */}
                                    </div>
                                    {/* End first row */}
                                    {/* Second row */}
                                    <div className="row">
                                          {/* Date select */}
                                          <div className="form-group col-12 col-sm-6 d-flex justify-content-center flex-column my-2">
                                                <label htmlFor="date">{textObject.date[language]}</label>
                                                <input
                                                      className="form-control required" type="date" name="date"
                                                      required
                                                      value={date}
                                                      onChange={e => setDate(e.target.value)}
                                                />
                                          </div>
                                          {/* End date select */}
                                          {/* Trip type select */}
                                          <div className="form-group col-12 col-sm-6 d-flex justify-content-center flex-column my-2">
                                                <label htmlFor="tripType">{textObject.tripType[language]}</label>
                                                <Select
                                                      className="required"
                                                      required
                                                      name="tripType"
                                                      value={tripType}
                                                      onChange={e => setTripType(e)}
                                                      options={tripOptions}
                                                >
                                                </Select>
                                          </div>
                                          {/* End trip type select */}
                                    </div>
                                    {/* End second row */}
                                    {/* Third row */}
                                    <div className="row pb-3">
                                          <div className="form-group d-flex justify-content-center flex-column my-2">
                                                <input type="submit" className="btn btn-primary" value={textObject.search[language]} />
                                          </div>
                                    </div>
                                    {/* End third row */}
                              </form>
                              {/* End form */}
                        </div>
                  </div>
            </main>
      )
}
