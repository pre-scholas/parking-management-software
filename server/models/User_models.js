import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email address']
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'operator'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
        default: null,  //Date.now,
    },
    licensePlate: [{
        type: String,
        ref: 'UserVehicle', //Reference the "UserVehicle" model
    }]
    

})

// .username, email, password
// .role: ('user', 'admin', 'operator')
// .createdAt, updatedAt
// .lastLogin
// .licensePlate: Array of references to userVehicle documents

// Optional: Add a pre-save hook to hash the password before saving a new user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to update lastLogin field (example of a custom method)
UserSchema.methods.updateLastLogin = function () {
  this.lastLogin = Date.now();
  return this.save();
};

const User = mongoose.model('User', UserSchema);

export default User;