import Reservation from '../models/Reservation_models.js';
import Lot from '../models/Lots_models.js';

/**
 *     Create a new reservation
 *    POST /api/reservations
 *   Private
 */
export const createReservation = async (req, res) => {
    const { user, lot, startTime, endTime, vehicleInfo } = req.body;

    try {
        const parkingLot = await Lot.findById(lot);

        if (!parkingLot) {
            return res.status(404).json({ message: 'Parking lot not found' });
        }

        if (parkingLot.availableSpots <= 0) {
            return res.status(400).json({ message: 'No available spots in this lot' });
        }

        const reservation = new Reservation({
            user,
            lot,
            startTime,
            endTime,
            vehicleInfo,
        });

        const createdReservation = await reservation.save();

        // Decrement available spots
        parkingLot.availableSpots -= 1;
        await parkingLot.save();

        res.status(201).json(createdReservation);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 *  Get all reservations for a user
 *    GET /api/reservations
 *      Private
 */
export const getMyReservations = async (req, res) => {
    // Assuming user ID is available from auth middleware
    // const userId = req.user._id; 
    // For now, let's get it from query/params for testing
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        const reservations = await Reservation.find({ user: userId }).populate('lot', 'name hourlyRate');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};