import express from 'express';
import Lots from '../models/Lots_models.js';

const router = express.Router();

/**
 * @route   GET /api/lots
 * @desc    Get all parking lots
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        // Use the Lots model to find all documents in the 'lots' collection
        const lots = await Lots.find({});

        // Send the found lots back as a JSON response
        res.json(lots);
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
        const lot = await Lots.findById(req.params.id);

        // If no lot is found with that ID, return a 404 Not Found error
        if (!lot) {
            return res.status(404).json({ msg: 'Lot not found' });
        }

        // If the lot is found, send it back as a JSON response
        res.json(lot);
    } catch (err) {
        console.error(err.message);
        // If the provided ID is not a valid MongoDB ObjectId, it will throw an error
        res.status(500).send('Server Error');
    }
});

export default router;