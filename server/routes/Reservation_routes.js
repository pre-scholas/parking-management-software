import express from 'express';
import { createReservation, getMyReservations, cancelReservation } from '../controllers/reservations_controller.js';
// import { protect } from '../middleware/authMiddleware.js'; // Assuming you have auth middleware

const router = express.Router();

// Get all reservations for user and create new reservation
// router.route('/').post(protect, createReservation).get(protect, getMyReservations);
router.route('/').post(createReservation).get(getMyReservations);

// Cancel specific reservation
// router.route('/:id').delete(protect, cancelReservation);
router.route('/:id').delete(cancelReservation);

export default router;