import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SpotSchema = new Schema({
    // A reference to the parking lot this spot belongs to.
    lot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lots', // This links it to the Lots model
        required: true,
    },
    // The identifier for the spot within the lot (e.g., "A1", "105").
    spotNumber: {
        type: String,
        required: true,
    },
    // To track if the spot is currently occupied.
    isOccupied: {
        type: Boolean,
        default: false,
    },
});

const Spot = mongoose.model('Spot', SpotSchema);

export default Spot;