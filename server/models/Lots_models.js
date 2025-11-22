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
    // The parking rate per hour.
    hourlyRate: {
        type: Number,
        required: true,
    },
}, {
    // Automatically adds and manages createdAt and updatedAt timestamps
    timestamps: true
});

// Virtual for availableSpots
// This is a dynamically calculated field and is not stored in the database.
LotsSchema.virtual('availableSpots').get(async function () {
    // To calculate available spots, we need to know how many spots are occupied.
    // This assumes you have a 'ParkingSession' model that tracks active parking,
    // and each parking session document has a reference to the lot's _id.
    // We are counting sessions that are active (i.e., checkOutTime is null).
    const occupiedSpots = await mongoose.model('ParkingSession').countDocuments({
        lotId: this._id,
        checkOutTime: null
    });
    return this.totalSpots - occupiedSpots;
});


const Lots = mongoose.model('Lots', LotsSchema);

export default Lots;
