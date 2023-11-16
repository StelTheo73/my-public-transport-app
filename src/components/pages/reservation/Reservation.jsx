import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export const Reservation = ({language, selectedTrip}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedTrip?.tripId) {
            navigate("/");
            return undefined;
        }
    });


  return (
    <main>Reservation</main>
  )
}

Reservation.propTypes = {
    language: PropTypes.string,
    selectedTrip: PropTypes.object
}
