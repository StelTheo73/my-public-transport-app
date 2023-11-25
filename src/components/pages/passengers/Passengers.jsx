import PropTypes from "prop-types"

export const Passengers = ({
  language
}) => {
  return (
    <main>
      <div>
        Passengers
      </div>
    </main>
  )
}

Passengers.propTypes = {
  language: PropTypes.string.isRequired,
}
