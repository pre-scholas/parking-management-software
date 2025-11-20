import express from 'express';
import { processPayment } from '../controllers/payments_controller.js';
// import { protect } from '../middleware/authMiddleware.js'; // Assuming you have auth middleware

const router = express.Router();

// router.route('/').post(protect, processPayment);
router.route('/').post(processPayment);

export default router;