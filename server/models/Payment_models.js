import mongoose from "mongoose";

const userSchema = mongoose.Schema;

const PaymentSchema = new Schema({
    reservationId: {
        type: userSchema.Types.OjectId,
        ref: 'Reservation', // refers to the 'Reservation' model
        required: true,
    },
    amount: {
        type: Number, // Use Number for currency or Decimal for precision
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // defaults to the current time of document creation
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Credit Card', 'PayPal', 'Cash', 'Bank Transfer'], // Example enum for allowed methods
    }
    // other payment-related fields (e.g., transaction ID from a payment processor)
})