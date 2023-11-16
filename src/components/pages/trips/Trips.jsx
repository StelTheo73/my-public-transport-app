import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaTrain, FaFlagCheckered, FaArrowRight,
    FaRegClock, FaEuroSign, FaInfoCircle,
} from "react-icons/fa";

import { Trip } from "./Trip.jsx";

import { useFetch } from "../../../hooks/useFetch.jsx";

import "./Trips.css";

import textObject from "../../../assets/language/trips.json";


export const Trips = ({ language, searchParameters, stations }) => {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const { data: trips, loading, error } = useFetch(url);
    // Navigate to home page is search has not been performed
    useEffect(() => {
        console.log(searchParameters)
        if (!searchParameters?.start || !searchParameters?.destination ||
            !searchParameters?.date || !searchParameters?.returnDate ||
            !searchParameters?.tripType ||
            !searchParameters?.start.english || !searchParameters?.destination.english) {
            navigate("/");
            return undefined;
        }

        setUrl("/fetch/trips/" + searchParameters.start.english + searchParameters.destination.english);


    }, [navigate, searchParameters]);

    return (
        <main>
            <div className="container-fluid">
                <div className="container d-flex align-items-center justify-content-end">
                    <button
                        className="btn btn-warning"
                        onClick={() => navigate("/")}
                    >{textObject.returnToSearch[language]}
                    </button>
                </div>


                <div className="container d-flex align-items-center justify-content-center mt-3">
                    <h3>{textObject.header[language]}</h3>
                </div>

                <div className="d-flex flex-column align-items-center">
                    <div className="trip-header pb-2 row">
                        <div className="col-2 px-1 px-sm-2">
                            <FaTrain/>
                        </div>
                        <div className="col-2 px-1 px-sm-2">
                            <FaFlagCheckered/>
                        </div>
                        <div className="col-2 px-1 px-sm-2">
                            <FaTrain/><FaArrowRight/><FaTrain/>
                        </div>
                        <div className="col-2 px-1 px-sm-2">
                            <FaRegClock/>
                        </div>
                        <div className="col-2 px-1 px-sm-2">
                            <FaEuroSign/>
                        </div>
                        <div className="col-2 px-1 px-sm-2">
                            <FaInfoCircle/>
                        </div>
                    </div>

                    {!error && !loading && trips && trips.map(trip => (
                        <Trip
                            key={trip.tripId}
                            language={language}
                            trip={trip}
                        />
                    ))}
                </div>

            </div>
        </main>
    );
};
