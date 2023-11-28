import "./Payment.css"
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdPayment, MdAirlineSeatReclineExtra } from "react-icons/md";
// import textObject from "../../../assets/language/passengers.json";


export const Payment = ({language}) =>{
  const navigate = useNavigate();

  return (
  <main>
    <div className="payment">
        {/* Navigation buttons */}
        <div className="container-fluid sticky-container">
            <div className="row">
                <div className="col-12 col-sm-6 d-flex justify-content-start">
                    <button className="btn btn-warning mt-2 mt-sm-1 full-width-xs"
                        onClick={() => {
                            navigate("/passengers", {state: {noOfSeats: 0}});
                        }}>
                        <FaArrowLeft className="me-2"/>
                        <span>
                            ΠΙΣΩ
                        </span>
                    <MdAirlineSeatReclineExtra className="me-2"/>
                    </button>
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-end">
                    <button
                        id="reservation-btn"
                        className="btn btn-success mt-2 mt-sm-1 full-width-xs"
                        onClick={() => {
                            navigate("/payment");
                        }}
                    >
                        <MdPayment className="mb-1 me-2"/>
                        <span>
                            ΜΠΡΟΣΤΑ
                        </span>
                        <FaArrowRight className="ms-2"/>
                    </button>
                </div>
            </div>
        </div>
        {/* End navigation buttons */}
    
        <div className="container d-flex align-items-center justify-content-center mt-3">
            <h3 id="page-header">Δυνατότητες πληρωμής</h3>
        </div>

        <div className="d-flex justify-content-between flex-wrap">
            {[1,2,3,4]}
        </div>
        
        <div className="container d-flex align-items-center justify-content-center mt-3">
            <h3 id="page-header">Στοιχεία</h3>
        </div>


        <div className="d-flex align-items-center flex-column">
            <div className="border m-3 p-3 passenger-wrapper">
                <span>Στοιχεία επικοινωνίας</span>

                <div className="mt-1">
                    <label className="form-label required" htmlFor="myron-input">Όνομα (το μόνο optional)</label>
                    <input id="myron-input" className="form-control required" required />
                </div>
                <div className="mt-1">
                    <label className="form-label required" htmlFor={`ticket-type-`}>Τηλέφωνο</label>
                    <input id="myron-input" className="form-control required" required />
                </div>
                <div className="mt-1">
                    <label className="form-label required" htmlFor={`ticket-type-`}>Email</label>
                    <input id="myron-input" className="form-control required" required />
                </div>
                <div className="mt-1">
                    <label className="form-label required" htmlFor={`ticket-type-`}>Καμιά πίπα;</label>
                    <input id="myron-input" className="form-control required" required />
                </div>
            </div>
            <div className="border m-3 p-3 passenger-wrapper">
                <span>Στοιχεία χρέωσης</span>

                <div className="mt-1">
                    <label className="form-label required" htmlFor="myron-input">Χώρα</label>
                    <input id="myron-input" className="form-control required" required />
                </div>
                <div className="mt-1">
                    <label className="form-label required" htmlFor={`ticket-type-`}>Ταχ. Κώδικας</label>
                    <input id="myron-input" className="form-control required" required />
                </div>
                <div className="mt-1">
                    <label className="form-label required" htmlFor={`ticket-type-`}>Πόλη</label>
                    <input id="myron-input" className="form-control required" required />
                </div>
                <div className="mt-1">
                    <label className="form-label required" htmlFor={`ticket-type-`}>Διεύθυνση</label>
                    <input id="myron-input" className="form-control required" required />
                </div>
                <div className="mt-1">
                    <label className="form-label required" htmlFor={`ticket-type-`}>Όροφος και ώρες που είναι άδειο το σπίτι</label>
                    <input id="myron-input" className="form-control required" required />
                </div>
            </div>
        </div>




        {/* <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex">
                <span className="flex-fill">
                    PAYMENT
                </span>
                <span id="chevron-1-span" className="rotate-transition d-flex align-items-center justify-content-center"
                    onClick={() => alert('CLICK')}>
                    <FaChevronUp id="chevron-1" className="rotate-transition" />
                </span>
            </div>
        </div> */}
    </div>
  </main>
)};
