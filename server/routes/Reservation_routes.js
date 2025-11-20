import express from 'express';
import { createReservation, getMyReservations } from '../controllers/reservations_controller.js';
// import { protect } from '../middleware/authMiddleware.js'; // Assuming you have auth middleware

const router = express.Router();

// router.route('/').post(protect, createReservation).get(protect, getMyReservations);
router.route('/').post(createReservation).get(getMyReservations);

export default router;