// parking spot reservation Schema
// mongoose.Schema .types .ObjectId to reference the user and the spot models, and date for the time-related fields

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReservationSchema = new Schema({ 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Refers to the 'User' model
        required: true,
    },
    spotId: {
        type: Schema.Types.ObjectId,
        ref: 'Spot', // Refers to the 'Spot' model
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    actualExitTime: {
        type: Date,
        // This field is optional and may be null if the user hasn't exited yet
    },
    // You might also want to add a status field, e.g., 'booked', 'active', 'completed', 'cancelled'
    status: {
        type: String,
        enum: ['booked', 'active', 'completed', 'cancelled'],
        default: 'booked',
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;