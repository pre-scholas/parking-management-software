import express from 'express'

const router = express.Router()

import lotsController from '../controllers/Lots_controller.js'

router.get('/', lotsController.getLots)

router.post('/', lotsController.createLot)

router.delete('/:id', lotsController.deleteLot)

router.put('/:id', lotsController.updateLot)

export default router

// CRUD

// Create - POST
// Read - GET
// Update - PUT/PATCH
// Delete - DELETE