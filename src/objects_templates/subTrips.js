/**
 * subTrips object template.
 * Applies for returnSubTrips as well
 * Represents a list of subTrips.
 * @typedef {Object[]} SubTripList
 * @property {Object} subTrip - The subTrip object.
 * @property {Object} subTrip.arrivalStation - The arrival station information.
 * @property {string} subTrip.arrivalTime - The arrival time in HH:MM.
 * @property {Object} subTrip.seats - The available seats information.
 * @property {Object} subTrip.selectedSeats - The selected seats information.
 *                                          - Each key is the id of the wagon.
 *                                          - Each value is a list containing the id
 *                                            the selected seat of each wagon
 *                                          - An empty list shows that no seat is selected.
 *                                          - If this is an empty object, it means that
 *                                            this vehicle does not support seat reservation.
 * @property {Object} subTrip.startStation - The start station information.
 * @property {string} subTrip.startTime - The start time in HH:MM.
 * @property {string} subTrip.trainId - The train ID.
 * @property {string} subTrip.tripId - The trip ID.
 */

// Example subTrip data
const subTripList = [
    {
      arrivalStation: { id: '4', EN: 'Kiaton', GR: 'Κιάτο', frequent: false },
      arrivalTime: '09:15',
      seats: SeatsInfo,
      selectedSeats: { B1: [], B2: [] },
      startStation: { id: '5', EN: 'Patras', GR: 'Πάτρα', frequent: true },
      startTime: '08:00',
      trainId: 'B0004',
      tripId: '28',
    },
    {
      arrivalStation: { id: '2', EN: 'Athens', GR: 'Αθήνα', frequent: true },
      arrivalTime: '10:30',
      seats: SeatsInfo,
      selectedSeats: {},
      startStation: { id: '4', EN: 'Kiaton', GR: 'Κιάτο', frequent: false },
      startTime: '09:15',
      trainId: 'T0004',
      tripId: '28A',
    },
    {
      arrivalStation: { id: '6', EN: 'Thessaloniki', GR: 'Θεσσαλονίκη', frequent: true },
      arrivalTime: '17:30',
      seats: SeatsInfo,
      selectedSeats: { I1: [], I2: [], I3: [], I4: [] },
      startStation: { id: '2', EN: 'Athens', GR: 'Αθήνα', frequent: true },
      startTime: '10:30',
      trainId: 'I0010',
      tripId: '28B',
    },
];

/**
 * Represents the available seats information.
 * @typedef {Object} SeatsInfo
 * @property {string} class - The class of the seat.
 * @property {string} wagonId - The ID of the wagon.
 * @property {number} basicCost - The basic cost of the seat.
 * @property {Object} seats - The seats availability details.
 */

// Example seats data
const seats = {
    B1: {
      class: '-',
      wagonId: 'B1',
      basicCost: 7.5,
      seats: { /* seat availability details */ },
    },
    B2: {
      class: '-',
      wagonId: 'B2',
      basicCost: 7.5,
      seats: { /* seat avalaibility details */ },
    },
};
