import express from 'express'
import lotsController from '../controllers/Lots_controller.js'
import { protect, admin } from '../middleware/index.js'

const router = express.Router()

// GET all lots (public)
router.get('/', lotsController.getLots)

// POST create lot (admin only)
router.post('/', protect, admin, lotsController.createLot)

// DELETE lot (admin only)
router.delete('/:id', protect, admin, lotsController.deleteLot)

// PUT update lot (admin only)
router.put('/:id', protect, admin, lotsController.updateLot)

export default router

// CRUD

// Create - POST
// Read - GET
// Update - PUT/PATCH
// Delete - DELETE