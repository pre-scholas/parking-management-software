import UserVehicle from '../models/UserVehicle_models.js';

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
const vehicleController = createCRUDController(UserVehicle);

// Add a custom function to get vehicles by their owner (userId)
vehicleController.getVehiclesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const vehicles = await UserVehicle.find({ owner: userId });
        if (!vehicles || vehicles.length === 0) {
            return res.status(404).json({ message: `No vehicles found for user ID: ${userId}` });
        }
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default vehicleController;