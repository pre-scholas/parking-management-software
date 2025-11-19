import express from 'express';
import spotsController from '../controllers/Spots_controller.js';

const router = express.Router();

// Route to get all spots for a specific lot
router.get('/lot/:lotId', spotsController.getSpotsByLotId);

router.get('/', spotsController.getAll);
router.post('/', spotsController.create);
router.put('/:id', spotsController.update);
router.delete('/:id', spotsController.delete);

export default router;