import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LotsSchema = new Schema({
    // The unique name of the parking lot (e.g., "Main Street Lot", "Airport Garage A")
    name: {
        type: String,
        required: true,
        unique: true
    },
    // The total number of parking spots in this lot.
    totalSpots: {
        type: Number,
        required: true,
    },
    // The number of currently available spots. This is expected to be updated frequently.
    availableSpots: {
        type: Number,
        required: true,
    },
    // The parking rate per hour.
    hourlyRate: {
        type: Number,
        required: true,
    },
}, {
    // Automatically adds and manages createdAt and updatedAt timestamps
    timestamps: true
});

const Lots = mongoose.model('Lots', LotsSchema);

export default Lots;
