import { useEffect  } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaTrain, FaFlagCheckered, FaArrowRight,
    FaRegClock, FaEuroSign, FaInfoCircle,
} from "react-icons/fa";

import { Trip } from "./Trip.jsx";

import "./Trips.css";

export const Trips = ({ language, trips, searchParameters }) => {
    const navigate = useNavigate();
    // const location = useLocation();
    // const searchParameters = new URLSearchParams(location.search);

    // Navigate to home page is search has not been performed
    useEffect(() => {
        // if (trips.searchPerformed !== true) {
        //     navigate("/");
        // }
        console.log(searchParameters)
        if (!searchParameters?.start || !searchParameters?.destination ||
            !searchParameters?.date || !searchParameters?.returnDate ||
            !searchParameters?.tripType) {
            console.log("False")
            navigate("/");
        }



    }, [navigate, trips.searchPerformed, searchParameters]);

    return (
        <main>
            <div className="container-fluid">
                <div className="container d-flex align-items-center justify-content-center">
                    <h3>Trips</h3>
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

                    <Trip language={language} trip={{}}/>


                    {/* <div
                        className="trip-wrapper row mt-2" id="trip-wrapper-2"
                        onClick={() => confirmTrip("trip-wrapper-1")}
                    >
                        <div className="col-2 px-1 px-sm-2">12:00</div>
                        <div className="col-2 px-1 px-sm-2">12:30</div>
                        <div className="col-2 px-1 px-sm-2">-</div>
                        <div className="col-2 px-1 px-sm-2">30'</div>
                        <div className="col-2 px-1 px-sm-2">2.5€</div>
                        <div className="col-2 px-1 px-sm-2">
                            <button className="btn btn-link" onClick={(event) => toggleDetails("trip-info-2", event)}>
                                <FaChevronDown />
                            </button>
                        </div>
                    </div>
                    <div className="row mt-2 trip-info-wrapper hide" id="trip-info-2">
                        <div className="col">Details 1</div>
                        <div className="col">Details 2</div>
                        <div className="col">Details 3</div>
                        <div className="col">Details 4</div>
                    </div>
                    <div className="trip-wrapper row mt-2">
                        <div className="col-2 px-1 px-sm-2">12:00</div>
                        <div className="col-2 px-1 px-sm-2">12:30</div>
                        <div className="col-2 px-1 px-sm-2">-</div>
                        <div className="col-2 px-1 px-sm-2">30'</div>
                        <div className="col-2 px-1 px-sm-2">2.5€</div>
                        <div className="col-2 px-1 px-sm-2">-</div>
                    </div> */}
                </div>

            </div>
        </main>
    );

    return null;
};
