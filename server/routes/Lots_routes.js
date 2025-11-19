import express from 'express'

const router = express.Router()

import lotsController from '../controllers/Lots_controller'

router.get('/', lotsController.getTodos)

router.post('/', lotsController.createTodo)

router.delete('/:id', lotsController.deleteTodo)

router.put('/:id', lotsController.updateTodo)

export default router

// CRUD

// Create - POST
// Read - GET
// Update - PUT/PATCH
// Delete - DELETE