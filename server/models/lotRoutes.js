import express from 'express';
import Lots from '../models/Lots_models.js';
import ParkingSession from '../models/ParkingSession_models.js';

const router = express.Router();

/**
 * @route   GET /api/lots
 * @desc    Get all parking lots
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        // Use .lean() for performance and to get plain JS objects
        const lots = await Lots.find({}).lean();

        // Since `availableSpots` is a virtual that needs an async call,
        // we need to manually compute it for each lot.
        // We'll run the counts in parallel for efficiency.
        const lotsWithAvailableSpots = await Promise.all(lots.map(async (lot) => {
            const occupiedSpots = await ParkingSession.countDocuments({
                lotId: lot._id,
                checkOutTime: null
            });
            lot.availableSpots = lot.totalSpots - occupiedSpots;
            return lot;
        }));

        res.json(lotsWithAvailableSpots);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route   GET /api/lots/:id
 * @desc    Get a single parking lot by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
    try {
        // Find a lot by its ID, which is passed in the URL parameters
        const lot = await Lots.findById(req.params.id).lean();

        // If no lot is found with that ID, return a 404 Not Found error
        if (!lot) {
            return res.status(404).json({ msg: 'Lot not found' });
        }

        // Manually calculate the available spots
        const occupiedSpots = await ParkingSession.countDocuments({
            lotId: lot._id,
            checkOutTime: null
        });
        lot.availableSpots = lot.totalSpots - occupiedSpots;

        // Send the lot object with the added availableSpots property
        res.json(lot);
    } catch (err) {
        console.error(err.message);
        // If the provided ID is not a valid MongoDB ObjectId, it will throw an error
        res.status(500).send('Server Error');
    }
});

export default router;