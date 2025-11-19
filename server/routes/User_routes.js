import express from 'express';
import userController from '../controllers/User_controller.js';

const router = express.Router();

// GET all users
router.get('/', userController.getUsers);

// GET a single user by ID
router.get('/:id', userController.getUserById);

// POST a new user
router.post('/', userController.createUser);

// PUT/PATCH update a user by ID
router.put('/:id', userController.updateUser);

// DELETE a user by ID
router.delete('/:id', userController.deleteUser);

export default router;