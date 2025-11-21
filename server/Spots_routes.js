import express from 'express';
import Spot from '../models/Spots_models.js';
import Lots from '../models/Lots_models.js'; // We need the Lot model for validation

const router = express.Router();

/**
 * @route   POST /api/spots
 * @desc    Create a new parking spot
 * @access  Public (for now; you might want to make this private/admin-only later)
 */
router.post('/', async (req, res) => {
    const { lotId, spotNumber } = req.body;

    // Basic validation
    if (!lotId || !spotNumber) {
        return res.status(400).json({ msg: 'Please provide lotId and spotNumber' });
    }

    try {
        // 1. Find the parent lot
        const lot = await Lots.findById(lotId);
        if (!lot) {
            return res.status(404).json({ msg: 'Lot not found' });
        }

        // 2. Count existing spots for this lot
        const existingSpotsCount = await Spot.countDocuments({ lot: lotId });

        // 3. Verify that we are not creating more spots than the lot's total capacity
        if (existingSpotsCount >= lot.totalSpots) {
            return res.status(400).json({ msg: `Cannot add more spots. Lot capacity of ${lot.totalSpots} reached.` });
        }

        // 4. Create and save the new spot
        const newSpot = new Spot({
            lot: lotId,
            spotNumber,
        });

        const savedSpot = await newSpot.save();
        res.status(201).json(savedSpot);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;