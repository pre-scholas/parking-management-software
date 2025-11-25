import express from 'express';
import userController from '../controllers/User_controller.js';
import { protect, admin, validateUser } from '../middleware/index.js';

const router = express.Router();

// GET all users (admin only)
router.get('/', protect, admin, userController.getUsers);

// GET a single user by ID (protected)
router.get('/:id', protect, userController.getUserById);

// POST a new user (register)
router.post('/', validateUser, userController.createUser);

// POST login user
router.post('/login', validateUser, userController.loginUser);

// POST register user
router.post('/register', validateUser, userController.registerUser);

// GET user profile (protected)
router.get('/profile', protect, userController.getUserProfile);

// PUT update user profile (protected)
router.put('/profile', protect, userController.updateUserProfile);

// GET user stats (protected)
router.get('/stats', protect, userController.getUserStats);

// PUT/PATCH update a user by ID (protected)
router.put('/:id', protect, userController.updateUser);

// DELETE a user by ID (admin only)
router.delete('/:id', protect, admin, userController.deleteUser);

export default router;