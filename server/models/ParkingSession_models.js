import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ParkingSessionSchema = new Schema({
    // Reference to the parking lot where the vehicle is parked.
    lotId: {
        type: Schema.Types.ObjectId,
        ref: 'Lots', // This should match the model name used for Lots.
        required: true,
    },
    // Reference to the user who initiated the parking session.
    // Assumes you have a 'User' model.
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Reference to the vehicle being parked.
    // Assumes you have a 'Vehicle' model.
    vehicleId: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    // The time when the parking session started. Defaults to the time of document creation.
    checkInTime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    // The time when the parking session ended. 'null' indicates the session is still active.
    checkOutTime: {
        type: Date,
        default: null,
    },
    // The total cost of the parking session. This would be calculated upon checkout.
    totalCost: {
        type: Number,
        default: null,
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps.
});

const ParkingSession = mongoose.model('ParkingSession', ParkingSessionSchema);

export default ParkingSession;