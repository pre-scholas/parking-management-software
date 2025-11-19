import Lots from '../models/Lots_models.js';

const getLots = async (req, res) => {
    try {
        const lots = await Lots.find({})
        res.status(200).json(lots)
    } catch (error) {
        console.error(error.message)
        res.status(400).json({ error: error.message })
    }
}


const createLot = async (req, res) => {
    try {
        console.log(req.body);
        const lot = await Lots.create(req.body)
        res.status(201).json(lot)
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ error: e.message, message: "Could not create Lot" })
    }
}


const deleteLot = async (req, res) => {
    try {
        const response = await Lots.findByIdAndDelete(req.params.id)
        if (!response) {
            return res.status(404).json({ message: "Lot not found" });
        }
        res.status(200).json(response)
    } catch (e) {
        console.error(e)
        res.status(400).json({ error: e.message })
    }
}

const updateLot = async (req, res) => {
    try {
        const lot = await Lots.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!lot) {
            return res.status(404).json({ message: "Lot not found" });
        }
        res.status(200).json(lot)
    } catch (e) {
        console.error(e)
        res.status(400).json({ error: e.message, message: "Could not update Lot" })
    }
}


export default {
    createLot,
    getLots,
    updateLot,
    deleteLot
}