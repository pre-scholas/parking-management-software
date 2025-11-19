import express from 'express';
import vehicleController from '../controllers/UserVehicle_controller.js';

const router = express.Router();

// Route to get all vehicles for a specific user
router.get('/user/:userId', vehicleController.getVehiclesByUserId);

router.get('/', vehicleController.getAll);
router.post('/', vehicleController.create);
router.put('/:id', vehicleController.update);
router.delete('/:id', vehicleController.delete);

export default router;