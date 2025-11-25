import express from "express"
import 'dotenv/config'
import cors from 'cors';
import connectDB from "./db.js";

const app = express()
const PORT = process.env.PORT || 8080

// Connect to the database
connectDB();

// import routes
import userRoutes from './routes/User_routes.js'; // Import user routes
import lotsRoutes from './routes/Lots_routes.js';
import vehicleRoutes from './routes/UserVehicle_routes.js';
import spotRoutes from './routes/Spots_routes.js';
import reservationRoutes from './routes/Reservation_routes.js';
import paymentRoutes from './routes/payment_routes.js';
import parkingSessionRoutes from './parkingSessionRoutes.js';

// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

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
// Use the parking session routes
app.use('/api/sessions', parkingSessionRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}!`)
})