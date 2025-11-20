import express from "express"
import 'dotenv/config'
import connectDB from "./db.js";

const app = express()
const PORT = process.env.PORT || 8080

// Connect to the database
connectDB();

import userRoutes from './routes/User_routes.js'; // Import user routes
import lotsRoutes from './routes/Lots_routes.js';
import vehicleRoutes from './routes/UserVehicle_routes.js';
import spotRoutes from './routes/Spots_routes.js';
import reservationRoutes from './routes/reservation_routes.js';
import paymentRoutes from './routes/payment_routes.js';

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route to check if the server is running
app.get("/", (req, res) => {
    res.send("Parking Management API is running.")
})

// Routes
// Use the user routes for any request to /api/users
app.use('/api/users', userRoutes);
// Use the lots routes for any request to /api/lots
app.use('/api/lots', lotsRoutes);
// Use the vehicle routes
app.use('/api/vehicles', vehicleRoutes);
// Use the spot routes
app.use('/api/spots', spotRoutes);
// Use the reservation routes
app.use('/api/reservations', reservationRoutes);
// Use the payment routes
app.use('/api/payments', paymentRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}!`)
})