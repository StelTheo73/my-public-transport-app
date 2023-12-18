import PropTypes from "prop-types";

import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaPaypal, FaTicketAlt } from "react-icons/fa";
import { MdPayment, MdAirlineSeatReclineExtra } from "react-icons/md";
import { ContactForm } from "./ContactForm";
import textObject from "../../../assets/language/payment.json";
import errorText from "../../../assets/language/error.json";
import creditCard from "../../../assets/images/paymentOptions/creditCard.png";
import payPal from "../../../assets/images/paymentOptions/payPal.png";
import coupons from "../../../assets/images/paymentOptions/coupon.jpg";
import { useEffect, useState, useRef } from "react";
import { ErrorAlert } from "../../ErrorAlert";

let payOptions;

const checkEmail = email => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const checkPhone = phone => /^(\+\d{1,3})?(\d{10})$/i.test(phone);

const validateInput = (input, test) => {
    if (test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    }
    else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
};

export const Payment = ({language, totalPrice}) =>{
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [formData, setFormData] = useState({});
    const continueButtonRef = useRef(null);
    const nameFieldRef = useRef(null);

    const handlePaymentOption = (optionNumber=null)=> {
        payOptions.forEach(opt=> {
            if (opt.classList.contains("active")) {
                opt.classList.remove("active");
            }
        });
        if (optionNumber !== null) {
            payOptions[optionNumber].classList.add("active");
            const tempFormData = {...formData};
            tempFormData.paymentOption = optionNumber;
            setFormData(tempFormData);
        }
    };

    const validateForm = event => {
        event.preventDefault();
        let formIsValid = true;
        const tempFormData = {...formData};
        const formInputs = document.querySelectorAll(".contact-form input.form-control");
        const formSelects = document.querySelectorAll(".contact-form select");
        const formCheckboxes = document.querySelectorAll(".contact-form input.form-check-input");

        [...formInputs, ...formSelects].forEach(input => {
        if(input.value.trim() === "") {
                formIsValid = false;
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
        }
        else {
            if (input.id === "contactEmail") {
                validateInput(input, checkEmail);
            }
            else if (input.id === "contactPhone") {
                validateInput(input, checkPhone);
            }
            else {
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
                tempFormData[input.id] = input.value.trim();
            }
        }
        });

        formCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                tempFormData[checkbox.id] = true;
                checkbox.classList.add("is-valid");
                checkbox.classList.remove("is-invalid");
            }
            else {
                checkbox.classList.add("is-invalid");
                checkbox.classList.remove("is-valid");
                formIsValid = false;
            }
        });

        setFormData(tempFormData);

        // Show error message if payment option is not selected
        formData.paymentOption === undefined ? setShowError(true) : setShowError(false);

        if (formIsValid && formData.paymentOption !== undefined) {
            navigate("/pay");
        }
    };

    useEffect(()=> {
        payOptions = document.querySelectorAll(".payment-option");
    }, []);

    useEffect(()=> {
        if (totalPrice === 0) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <main>
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
                    <div className="col-12 col-sm-6 d-flex justify-content-end hide-small">
                        <button
                            ref={continueButtonRef}
                            id="pay-btn"
                            className="btn btn-success mt-2 mt-sm-1 full-width-xs"
                            onClick={event => validateForm(event)}
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

            {/* Total price */}
            <div className="container d-flex align-items-center justify-content-end mt-3">
                <span className="h5 user-select-disabled">{textObject.totalCost[language]}:&nbsp;
                <span className="h3 text-primary-bold user-select-disabled">{totalPrice} €</span>
                </span>
            </div>
            {/* End total price */}


            {/* Contact form */}
            <div className="container d-flex align-items-center justify-content-center">
                <h3 id="page-header">{textObject.details[language]}</h3>
            </div>
            <ContactForm language={language} textObject={textObject} nameFieldRef={nameFieldRef}/>
            {/* End contact form */}

            {/* Payment options */}
            <div className="container d-flex align-items-center justify-content-center text-center mt-3">
                <h3 id="page-header">{textObject.paymentOptions[language]}</h3>
            </div>
            <ErrorAlert show={showError} error={errorText.payment[language]} />

            <div className="container payment-wrapper w-75">
                <div
                    className="payment-option"
                    onClick={() => handlePaymentOption(0)}
                    tabIndex={0}
                    onKeyDown={event => {
                        if (event.key === " " || event.key === "Enter") {
                            handlePaymentOption(0);
                        }
                    }}
                    >
                    <img className="hide-small" src={creditCard} alt="Card"/>
                    <MdPayment className="show-small" />
                    {textObject.cardPayment[language]}
                </div>
                <div
                    className="payment-option"
                    onClick={() => handlePaymentOption(1)}
                    tabIndex={0}
                    onKeyDown={event => {
                        if (event.key === " " || event.key === "Enter") {
                            handlePaymentOption(1);
                        }
                    }}
                >
                    <img className="hide-small" src={payPal} alt="PayPal"/>
                    <FaPaypal className="show-small" />
                    {textObject.PayPalPayment[language]}
                </div>
                <div
                    className="payment-option"
                    onClick={() => handlePaymentOption(2)}
                    tabIndex={0}
                    onKeyDown={event => {
                        if (event.key === " " || event.key === "Enter") {
                            handlePaymentOption(2);
                        }
                    }}
                >
                    <img className="hide-small" src={coupons} alt="coupons"/>
                    <FaTicketAlt className="show-small" />
                    {textObject.couponsPayment[language]}
                </div>
            </div>
            {/* End payment options */}

            {/* Next page button */}
            <div className="container-fluid d-flex align-items-center justify-content-end">
                <button
                    id="next-page-btn"
                    className="btn btn-success mt-3 full-width-xs default-shadow"
                    onClick={event => validateForm(event)}
                >
                    <MdPayment className="mb-1 me-2"/>
                    <span>
                        {textObject.continue[language]}
                    </span>
                    <FaArrowRight className="ms-2"/>
                </button>
            </div>
            {/* End next page button */}

            <span
                className=""
                tabIndex={0}
                onFocus={()=> continueButtonRef.current.focus()}
            >
            </span>
        </main>
    );
};

Payment.propTypes = {
    language: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired
};
