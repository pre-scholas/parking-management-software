import User from '../models/User_models.js';

// Handles GET requests to fetch all users.
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude password from results
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
};

// Handles GET requests to fetch a single user by ID.
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
};

// Handles POST requests to create a new user.
// NOTE: In a real application, you would hash the password here before saving.
const createUser = async (req, res) => {
    try {
        // For a real application, you'd hash req.body.password here
        const user = await User.create(req.body);
        // Respond with the created user, excluding the password
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(201).json(userResponse);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ error: e.message, message: 'Could not create User' });
    }
};

// Handles PUT requests to update a user by ID.
const updateUser = async (req, res) => {
    try {
        // For a real application, if password is in req.body, hash it before updating
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(200).json(userResponse);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ error: e.message, message: 'Could not update User' });
    }
};

// Handles DELETE requests to remove a user by ID.
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: e.message });
    }
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};