import mongoose from 'mongoose';

const Schema = mongoose.Schema

const VehicleSchema = new Schema({
    licensePlate: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear() + 1
    },
    owner: {
        // this is how you reference another document
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',// refers to the 'User' model defined above
        required: true
    }
}, {
    timestamps: true
});

const UserVehicle = mongoose.model('UserVehicle', VehicleSchema);
// Mongoose will automatically look for the 'vehicles' collection name.
export default UserVehicle;