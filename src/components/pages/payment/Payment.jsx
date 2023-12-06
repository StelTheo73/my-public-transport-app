import PropTypes from "prop-types";

import "./Payment.css"
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaPaypal, FaTicketAlt } from "react-icons/fa";
import { MdPayment, MdAirlineSeatReclineExtra } from "react-icons/md";
import { ContactForm } from "./ContactForm";
import textObject from "../../../assets/language/payment.json";
import errorText from "../../../assets/language/error.json";
import creditCard from "../../../assets/images/paymentOptions/creditCard.png"
import payPal from "../../../assets/images/paymentOptions/payPal.png"
import coupons from "../../../assets/images/paymentOptions/coupon.jpg"
import { useEffect, useState } from "react";
import { ErrorAlert } from "../../ErrorAlert";


let payOptions;
let choseOption = false;

const handlePaymentOption = (elmt)=> {
    payOptions.forEach(opt=> {
        if (opt.classList.contains("active")) opt.classList.remove("active");
    });
    payOptions[elmt].classList.add("active");
    choseOption = true;
}

const checkEmail = email=> /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const checkPhone = phone=> /^(2\d|69)\d{8}$/.test(phone);

export const Payment = ({language}) =>{
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    useEffect(()=> {
        payOptions = document.querySelectorAll(".payment-option");
    }, []);


    const validateForm = (e) => {
        e.preventDefault();

        if(!choseOption) setShowError(true);
        else {
            setShowError(false);
            navigate("#");
        }
    };

    return <main>
        <form className="payment" onSubmit={validateForm}>
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
                                {textObject.passengers[language]}
                            </span>
                        <MdAirlineSeatReclineExtra className="ms-2"/>
                        </button>
                    </div>
                    <div className="col-12 col-sm-6 d-flex justify-content-end">
                        <button
                            id="reservation-btn"
                            className="btn btn-success mt-2 mt-sm-1 full-width-xs"
                            type="submit"
                        >
                            <MdPayment className="mb-1 me-2"/>
                            <span>
                                {textObject.continue[language]}
                            </span>
                            <FaArrowRight className="ms-2"/>
                        </button>
                    </div>
                </div>
            </div>
            {/* End navigation buttons */}

            <ErrorAlert show={showError} error={errorText.payment[language]} />

            <div className="container d-flex align-items-center justify-content-center mt-3 text-center">
                <h3 id="page-header">{textObject.paymentOptions[language]}</h3>
            </div>

            <div className="payment-wrapper">
                <div className="payment-option" onClick={e=> handlePaymentOption(0)}>
                    <img className="hide-small" src={creditCard} alt="Card"/>
                    <MdPayment className="show-small" />
                    {textObject.cardPayment[language]}
                </div>
                <div className="payment-option" onClick={e=> handlePaymentOption(1)}>
                    <img className="hide-small" src={payPal} alt="PayPal"/>
                    <FaPaypal className="show-small" />
                    {textObject.PayPalPayment[language]}
                </div>
                <div className="payment-option" onClick={e=> handlePaymentOption(2)}>
                    <img className="hide-small" src={coupons} alt="coupons"/>
                    <i class="pi-ticket"></i>
                    <FaTicketAlt className="show-small" />
                    {textObject.couponsPayment[language]}
                </div>
            </div>

            <div className="container d-flex align-items-center justify-content-center mt-3">
                <h3 id="page-header">{textObject.details[language]}</h3>
            </div>

            <ContactForm language={language} textObject={textObject}/>

        </form>
    </main>
};

Payment.propTypes = {
    language: PropTypes.string.isRequired,
    passengers: PropTypes.object.isRequired
};
