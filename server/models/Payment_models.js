import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    // Reference to the reservation this payment is for
    reservation: {
        type: Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true,
    },
    // The amount paid
    amount: {
        type: Number,
        required: true,
    },
    // The method of payment
    paymentMethod: {
        type: String,
        default: 'Credit Card',
    },
    // The status of the payment
    status: {
        type: String,
        enum: ['succeeded', 'failed', 'pending'],
        default: 'pending',
    },
}, {
    timestamps: true
});

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;