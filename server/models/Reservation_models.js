import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    // Reference to the user who made the reservation
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Reference to the parking lot for the reservation
    lot: {
        type: Schema.Types.ObjectId,
        ref: 'Lots',
        required: true,
    },
    // Reference to the specific parking spot
    spotId: {
        type: Schema.Types.ObjectId,
        ref: 'Spot',
    },
    // The start time of the reservation
    startTime: {
        type: Date,
        required: true,
    },
    // The end time of the reservation
    endTime: {
        type: Date,
        required: true,
    },
    // Actual exit time (for completed reservations)
    actualExitTime: {
        type: Date,
    },
    // Total cost of the reservation
    totalCost: {
        type: Number,
    },
    // Information about the vehicle
    vehicleInfo: {
        licensePlate: { type: String, required: true },
        make: { type: String },
        model: { type: String },
        color: { type: String },
    },
    // Status of the reservation
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active',
    },
}, {
    timestamps: true
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;