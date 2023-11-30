import PropTypes from "prop-types";

import Carousel from "react-bootstrap/Carousel";
// IMport related css with carousel
// import "bootstrap/dist/css/bootstrap.min.css";

import textObject from "../../../assets/language/help.json";
import "./HelpReservation.css";

import GR_1 from "../../../assets/images/reservation/GR_1.svg";
import GR_2 from "../../../assets/images/reservation/GR_2.svg";
import GR_3 from "../../../assets/images/reservation/GR_3.svg";
import GR_4 from "../../../assets/images/reservation/GR_4.svg";
import EN_1 from "../../../assets/images/reservation/EN_1.svg";
import EN_2 from "../../../assets/images/reservation/EN_2.svg";
import EN_3 from "../../../assets/images/reservation/EN_3.svg";
import EN_4 from "../../../assets/images/reservation/EN_4.svg";

export const HelpReservation = ({language, setHelp}) => {

    return (
        <main>
            <div className="container d-flex justify-content-between align-items-center flex-wrap mb-2">
                <h3 id="page-header" className="mb-0">{textObject.common.header[language]}</h3>
                <div className="ml-auto">
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setHelp(false)}
                    >{textObject.common.close[language]}
                    </button>
                </div>
            </div>

            <div
                className="container-fluid w-100 p-1 m-0 d-flex align-items-center justify-content-center rounded border border-primary default-shadow">
                <Carousel
                    className="pb-5 w-100 h-100"
                    data-bs-theme="dark"
                    fade
                    indicators
                    interval={null}
                    touch
                    prevLabel={textObject.common.prevLabel[language]}
                    nextLabel={textObject.common.nextLabel[language]}
                >
                    <Carousel.Item>
                        {language === "EN" && <img
                            className="d-block w-100"
                            src={EN_1}
                            alt="First slide"
                        />}
                        {language === "GR" && <img
                            className="d-block w-100"
                            src={GR_1}
                            alt="First slide"
                        />}
                    </Carousel.Item>
                    <Carousel.Item>
                        {language === "EN" && <img
                            className="d-block w-100"
                            src={EN_2}
                            alt="Second slide"
                        />}
                        {language === "GR" && <img
                            className="d-block w-100"
                            src={GR_2}
                            alt="Second slide"
                        />}
                    </Carousel.Item>
                    <Carousel.Item>
                        {language === "EN" && <img
                            className="d-block w-100"
                            src={EN_3}
                            alt="Third slide"
                        />}
                        {language === "GR" && <img
                            className="d-block w-100"
                            src={GR_3}
                            alt="Third slide"
                        />}
                    </Carousel.Item>
                    <Carousel.Item>
                        {language === "EN" && <img
                            className="d-block w-100"
                            src={EN_4}
                            alt="Fourth slide"
                        />}
                        {language === "GR" && <img
                            className="d-block w-100"
                            src={GR_4}
                            alt="Fourth slide"
                        />}
                    </Carousel.Item>
                </Carousel>
            </div>
        </main>
  );

}

HelpReservation.propTypes = {
    language: PropTypes.string.isRequired,
    setHelp: PropTypes.func.isRequired
};
