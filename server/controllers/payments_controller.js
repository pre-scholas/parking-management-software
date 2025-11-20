import Payment from '../models/Payment_models.js';
import Reservation from '../models/Reservation_models.js';

/**
 * @desc    Process a payment for a reservation
 * @route   POST /api/payments
 * @access  Private
 */
export const processPayment = async (req, res) => {
    const { reservationId, amount, paymentMethod } = req.body;

    try {
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // In a real application, you would integrate with a payment gateway 
        // For this example, we'll just simulate a successful payment.

        const payment = new Payment({
            reservation: reservationId,
            amount,
            paymentMethod,
            status: 'succeeded', // Simulating success
        });

        const createdPayment = await payment.save();

        res.status(201).json({
            message: 'Payment processed successfully',
            payment: createdPayment,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};