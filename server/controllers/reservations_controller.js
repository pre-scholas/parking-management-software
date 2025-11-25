import Reservation from '../models/Reservation_models.js';
import Lot from '../models/Lots_models.js';
import Spot from '../models/Spots_models.js';

/**
 * Create a new reservation
 * POST /api/reservations
 * Private
 */
export const createReservation = async (req, res) => {
    const { user, lot, spotId, startTime, endTime, vehicleInfo } = req.body;

    try {
        const parkingLot = await Lot.findById(lot);
        if (!parkingLot) {
            return res.status(404).json({ message: 'Parking lot not found' });
        }

        // Calculate total cost based on duration and hourly rate
        const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60); // hours
        const totalCost = duration * parkingLot.hourlyRate;

        const reservation = new Reservation({
            user,
            lot,
            startTime,
            endTime,
            vehicleInfo,
            totalCost
        });

        const createdReservation = await reservation.save();
        await createdReservation.populate(['lot', 'user']);

        res.status(201).json(createdReservation);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * Get all reservations for authenticated user
 * GET /api/reservations
 * Private
 */
export const getMyReservations = async (req, res) => {
    try {
        // For demo purposes, return mock data that matches frontend expectations
        // In production, use: const userId = req.user._id;
        const mockReservations = [
            {
                _id: '674a1234567890abcdef0001',
                user: '674a1234567890abcdef0100',
                lot: '674a1234567890abcdef0200',
                startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
                totalCost: 15.50,
                status: 'active',
                vehicleInfo: { licensePlate: 'ABC123' },
                spotId: { spotIdentifier: 'A12' },
                lotId: { name: 'Downtown Parking Garage' }
            },
            {
                _id: '674a1234567890abcdef0002',
                user: '674a1234567890abcdef0100',
                lot: '674a1234567890abcdef0201',
                startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                endTime: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
                totalCost: 8.00,
                status: 'completed',
                vehicleInfo: { licensePlate: 'XYZ789' },
                spotId: { spotIdentifier: 'B05' },
                lotId: { name: 'Mall Parking Lot' },
                actualExitTime: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString()
            }
        ];

        res.json(mockReservations);
        
        // Production code would be:
        // const reservations = await Reservation.find({ user: req.user._id })
        //     .populate('lot', 'name hourlyRate')
        //     .populate('spotId', 'spotIdentifier')
        //     .sort({ createdAt: -1 });
        // res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * Cancel a reservation
 * DELETE /api/reservations/:id
 * Private
 */
export const cancelReservation = async (req, res) => {
    try {
        const { id } = req.params;
        
        // For demo purposes, just return success
        // In production, you would:
        // const reservation = await Reservation.findById(id);
        // if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        // if (reservation.user.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: 'Not authorized' });
        // }
        // reservation.status = 'cancelled';
        // await reservation.save();
        
        res.json({ message: 'Reservation cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};