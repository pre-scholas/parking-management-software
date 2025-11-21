import Spot from '../models/Spots_models.js';
import Lots from '../models/Lots_models.js'; // Import the Lot model

// Generic controller factory for CRUD operations
const createCRUDController = (model) => ({
    // Get all documents
    getAll: async (req, res) => {
        try {
            const items = await model.find({});
            res.status(200).json(items);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Create a new document
    create: async (req, res) => {
        try {
            const item = await model.create(req.body);
            res.status(201).json(item);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Delete a document by ID
    delete: async (req, res) => {
        try {
            const item = await model.findByIdAndDelete(req.params.id);
            if (!item) {
                return res.status(404).json({ message: `${model.modelName} not found` });
            }
            res.status(200).json({ message: `${model.modelName} deleted successfully` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Update a document by ID
    update: async (req, res) => {
        try {
            const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!item) {
                return res.status(404).json({ message: `${model.modelName} not found` });
            }
            res.status(200).json(item);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
});

/**
 * Custom update function for spots to handle `availableSpots` logic.
 * This will override the generic update function for the spots controller.
 */
const updateSpotStatus = async (req, res) => {
    const { id } = req.params;
    const { isOccupied } = req.body;

    // Check if isOccupied is provided and is a boolean
    if (typeof isOccupied !== 'boolean') {
        return res.status(400).json({ error: 'isOccupied must be a boolean value.' });
    }

    try {
        // 1. Find the spot to get its current state and its lot ID
        const spot = await Spot.findById(id);
        if (!spot) {
            return res.status(404).json({ message: 'Spot not found' });
        }

        // 2. Check if the status is actually changing
        if (spot.isOccupied !== isOccupied) {
            // 3. Atomically update the availableSpots count on the parent lot
            // Use $inc to increment or decrement. If isOccupied is true (spot becomes occupied), decrement. If false, increment.
            let updatedLot;
            if (isOccupied) {
                // Decrement availableSpots, but only if it's greater than 0
                updatedLot = await Lots.findOneAndUpdate(
                    { _id: spot.lot, availableSpots: { $gt: 0 } },
                    { $inc: { availableSpots: -1 } }
                );
            } else {
                // Increment availableSpots, but only if it's less than totalSpots
                updatedLot = await Lots.findOneAndUpdate(
                    { _id: spot.lot, availableSpots: { $lt: spot.totalSpots } }, // We need to get totalSpots on the spot or lot object
                    { $inc: { availableSpots: 1 } }
                );
            }

            // 4. Update the spot's status
            spot.isOccupied = isOccupied;
            await spot.save();
        }

        // 5. Return the updated spot
        res.status(200).json(spot);
    } catch (error) {
        console.error("Error updating spot status:", error);
        res.status(500).json({ error: 'Server error while updating spot status.' });
    }
};

// To make the above logic work, we need to populate the lot information when finding the spot.
// Let's refine the `updateSpotStatus` function.
const refinedUpdateSpotStatus = async (req, res) => {
    const { id } = req.params;
    const { isOccupied } = req.body;

    if (typeof isOccupied !== 'boolean') {
        return res.status(400).json({ error: 'isOccupied must be a boolean value.' });
    }

    try {
        const spot = await Spot.findById(id).populate('lot'); // Populate the lot details
        if (!spot) return res.status(404).json({ message: 'Spot not found' });

        if (spot.isOccupied !== isOccupied) {
            let lotUpdateQuery;
            if (isOccupied) { // Spot is becoming occupied
                lotUpdateQuery = { _id: spot.lot._id, availableSpots: { $gt: 0 } };
            } else { // Spot is becoming available
                lotUpdateQuery = { _id: spot.lot._id, availableSpots: { $lt: spot.lot.totalSpots } };
            }

            const change = isOccupied ? -1 : 1;
            const updatedLot = await Lots.findOneAndUpdate(lotUpdateQuery, { $inc: { availableSpots: change } });

            if (!updatedLot) {
                const message = isOccupied ? 'Cannot occupy spot, lot is already full.' : 'Cannot free spot, lot is already at maximum availability.';
                return res.status(409).json({ message }); // 409 Conflict
            }

            spot.isOccupied = isOccupied;
            await spot.save();
        }

        res.status(200).json(spot);
    } catch (error) {
        console.error("Error updating spot status:", error);
        res.status(500).json({ error: 'Server error while updating spot status.' });
    }
};

// Create the base CRUD controller
const spotsController = createCRUDController(Spot);

// Add a custom function to get spots by their lotId
spotsController.getSpotsByLotId = async (req, res) => {
    try {
        const { lotId } = req.params;
        const spots = await Spot.find({ lot: lotId });
        if (!spots || spots.length === 0) {
            return res.status(404).json({ message: `No spots found for lot ID: ${lotId}` });
        }
        res.status(200).json(spots);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Override the generic update with our custom function
spotsController.update = refinedUpdateSpotStatus;

export default spotsController;