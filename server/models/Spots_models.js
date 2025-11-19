import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the ParkingSpot Schema
const ParkingSpotSchema = new Schema({
    // Reference to the parent parking lot document
    lotId: {
        type: Schema.Types.ObjectId,
        ref: 'Lots', // Refers to the 'Lots' model
        required: true
    },
    // Unique identifier for the spot (e.g., A1, B15, Level 2 Spot 03)
    spotIdentifier: {
        type: String,
        required: true,
        trim: true, // Remove leading/trailing whitespace
        unique: true // Ensures no two spots have the same identifier
    },
    // Status of the parking spot. This field triggers real-time updates.
    status: {
        type: String,
        required: true,
        enum: ['available', 'occupied', 'reserved', 'maintenance'], // Restricts values to these options
        default: 'available', // Default status when a new spot is created
        index: true // Indexing this field for faster queries, especially for real-time updates
    },
    // Type of vehicle the spot is designed for
    spotType: {
        type: String,
        required: true,
        enum: ['car', 'motorcycle', 'truck', 'EV', 'handicap', 'compact'], // Restricts values to these options
    },
}, {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true
});

// Create the model from the schema
const Spot = mongoose.model('Spot', ParkingSpotSchema);

export default Spot;
