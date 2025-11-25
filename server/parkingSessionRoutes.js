import express from 'express';
import ParkingSession from './models/ParkingSession_models.js';
import Lots from './models/Lots_models.js';
import mongoose from 'mongoose';
import { protect } from './middleware/index.js';

const router = express.Router();

/**
 * @route   POST /api/sessions/check-in
 * @desc    Create a new parking session (check-in)
 * @access  Private (assuming user is authenticated)
 */
router.post('/check-in', protect, async (req, res) => {
    const { lotId, userId, vehicleId } = req.body;

    // Basic validation
    if (!lotId || !userId || !vehicleId) {
        return res.status(400).json({ msg: 'Please provide lotId, userId, and vehicleId' });
    }

    try {
        const lot = await Lots.findById(lotId);
        if (!lot) {
            return res.status(404).json({ msg: 'Lot not found' });
        }

        // Check for available spots before creating a session
        const occupiedSpots = await ParkingSession.countDocuments({ lotId, checkOutTime: null });
        if (occupiedSpots >= lot.totalSpots) {
            return res.status(400).json({ msg: 'No available spots in this lot' });
        }

        // Create and save the new parking session
        const newSession = new ParkingSession({
            lotId,
            userId,
            vehicleId,
        });

        const session = await newSession.save();
        res.status(201).json(session);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route   PATCH /api/sessions/check-out/:sessionId
 * @desc    End a parking session (check-out)
 * @access  Private
 */
router.patch('/check-out/:sessionId', protect, async (req, res) => {
    try {
        const { sessionId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(sessionId)) {
            return res.status(400).json({ msg: 'Invalid session ID' });
        }

        const session = await ParkingSession.findById(sessionId);

        if (!session) {
            return res.status(404).json({ msg: 'Parking session not found' });
        }

        if (session.checkOutTime) {
            return res.status(400).json({ msg: 'Session already checked out' });
        }

        // Get the lot to calculate the cost
        const lot = await Lots.findById(session.lotId);
        if (!lot) {
            // This case is unlikely if data integrity is maintained
            return res.status(404).json({ msg: 'Associated lot not found' });
        }

        const checkOutTime = new Date();
        const checkInTime = session.checkInTime;

        // Calculate duration in hours
        const durationInMillis = checkOutTime - checkInTime;
        const durationInHours = durationInMillis / (1000 * 60 * 60);

        // Calculate total cost (ensure you handle rounding as needed)
        const totalCost = Math.max(durationInHours * lot.hourlyRate, 0); // Ensure cost isn't negative

        // Update the session
        session.checkOutTime = checkOutTime;
        session.totalCost = totalCost.toFixed(2); // Store as a number with 2 decimal places

        const updatedSession = await session.save();

        res.json(updatedSession);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;