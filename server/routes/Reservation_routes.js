import express from 'express';
import { createReservation, getMyReservations, cancelReservation } from '../controllers/reservations_controller.js';
import { protect, validateReservation } from '../middleware/index.js';

const router = express.Router();

// Get all reservations for user and create new reservation
router.route('/').post(protect, validateReservation, createReservation).get(protect, getMyReservations);

// Cancel specific reservation
router.route('/:id').delete(protect, cancelReservation);

export default router;