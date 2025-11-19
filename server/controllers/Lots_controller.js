import lots from '../models/Lots_models.js';

const getLots = async (req, res) => {
    try {
        const lot = await Lots.find({})
        res.status(200).json(lot)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}


const createLot = async (req, res) => {
    try {
        console.log(req.body);
        const lot = await Lots.create(req.body)
        res.status(200).json(todo)
    } catch (e) {
        console.log(e.message)
        res.status(400).json({ error: e.message })
    }
}


const deleteLot = async (req, res) => {
    try {
        const response = await Lots.findByIdAndDelete(req.params.id)
        console.log(response)
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.status(400).json({ error: e.message })
    }
}

const updateLot = async (req, res) => {
    try {
        const lot = await Lots.findById(req.params.id)
        lot.completed = !lot.completed
        await lot.save()
        res.status(200).json(todo)
    } catch (e) {
        console.log(e)
        res.status(400).json({ error: e.message })
    }
}


export default {
    createLot,
    getLots,
    updateLot,
    deleteLot
}