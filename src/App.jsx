import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { BS_SMALL, BS_MEDIUM } from "./env/constants";

import "./App.css";

import { Contact } from "./components/pages/contact/Contact.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { Header } from "./components/header/Header.jsx";
import { Home } from "./components/Home.jsx";
import { Passengers } from "./components/pages/passengers/Passengers.jsx";
import { Reservation } from "./components/pages/reservation/Reservation";
import { Sidebar } from "./components/Sidebar";
import { Trips } from "./components/pages/trips/Trips";
import { Navigate } from "react-router-dom/dist/index.js";
import { Payment } from "./components/pages/payment/Payment.jsx";

function App() {
  const [searchParameters, setSearchParameters] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [language, setLanguage] = useState("GR");
  const [stations, setStations] = useState({});
  const [selectedTrip, setSelectedTrip] = useState({});
  const [selectedReturnTrip, setSelectedReturnTrip] = useState({});
  const [subTrips, setSubTrips] = useState([]);
  const [returnSubTrips, setReturnSubTrips] = useState([]);
  const [passengers, setPassengers] = useState({});
  const [noOfSeats, setNoOfSeats] = useState(-1);

  const location = useLocation();

  // Hide elements when screen is small
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= BS_SMALL) {
        document.querySelectorAll(".hide-small").forEach(element => {
          element.classList.add("hide");
        });
      }
      else {
        document.querySelectorAll(".hide-small").forEach(element => {
          element.classList.remove("hide");
        });
      }

      if (window.innerWidth <= BS_MEDIUM) {
        document.querySelectorAll(".hide-medium").forEach(element => {
          element.classList.add("hide");
        });
      }
      else {
        document.querySelectorAll(".hide-medium").forEach(element => {
          element.classList.remove("hide");
        });
      }

    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location]);


  return (
    <div className="App d-flex justify-content-center">
      <Header
        showSidebar={showSidebar} setShowSidebar={setShowSidebar}
        language={language} setLanguage={setLanguage}/>
      <Sidebar
        showSidebar={showSidebar} setShowSidebar={setShowSidebar}
        language={language}/>
      <div className="main-wrapper">
        <Routes>
            <Route path="/" element={
                <Home
                language={language}
                searchParameters={searchParameters}
                setSearchParameters={setSearchParameters}
                setStations={setStations}
                />
            } />
            <Route path="trips" element={
              <Trips
                language={language}
                searchParameters={searchParameters}
                stations={stations}
                selectedTrip={selectedTrip}
                setSelectedTrip={setSelectedTrip}
                selectedReturnTrip={selectedReturnTrip}
                setSelectedReturnTrip={setSelectedReturnTrip}
                setSubTrips={setSubTrips}
                setReturnSubTrips={setReturnSubTrips}
                />
            } />
            <Route path="reservation" element={
              <Reservation
                language={language}
                searchParameters={searchParameters}
                stations={stations}
                selectedTrip={selectedTrip}
                selectedReturnTrip={selectedReturnTrip}
                subTrips={subTrips}
                setSubTrips={setSubTrips}
                returnSubTrips={returnSubTrips}
                setReturnSubTrips={setReturnSubTrips}
                setNoOfSeats={setNoOfSeats}
                />
            } />
            <Route path="passengers" element={
              <Passengers
                language={language}
                searchParameters={searchParameters}
                stations={stations}
                selectedTrip={selectedTrip}
                selectedReturnTrip={selectedReturnTrip}
                subTrips={subTrips}
                setSubTrips={setSubTrips}
                returnSubTrips={returnSubTrips}
                setReturnSubTrips={setReturnSubTrips}
                passengers={passengers}
                setPassengers={setPassengers}
                noOfSeats={noOfSeats}
                setNoOfSeats={setNoOfSeats}
                />
            }  />
            <Route path="payment" element={
                <Payment
                  language={language}
                  passengers={passengers}
                />
            } />
            <Route path="contact" element={
                <Contact language={language}/>
            } />

            <Route path="/*" element={<Navigate to='/' />} />
        </Routes>
        <Footer language={language}/>
      </div>
    </div>
  );
}

export default App;
