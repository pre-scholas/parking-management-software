import mongoose from "mongoose";

const LotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    totalSpots: {
        type: Number,
        required: true,
    },
    availableSpots: {
        //this is calculated and updated frequently
        type: Number,
        required: true,
    },
    hourlyRate: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    
})

const Lot = mongoose.model('Lot', LotSchema);

export default Lot;


