import Spot from '../models/Spots_models.js';

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

// Create the base CRUD controller
const spotsController = createCRUDController(Spot);

// Add a custom function to get spots by their lotId
spotsController.getSpotsByLotId = async (req, res) => {
    try {
        const { lotId } = req.params;
        const spots = await Spot.find({ lotId: lotId });
        if (!spots || spots.length === 0) {
            return res.status(404).json({ message: `No spots found for lot ID: ${lotId}` });
        }
        res.status(200).json(spots);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default spotsController;