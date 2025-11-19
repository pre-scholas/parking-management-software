import express from "express"
import 'dotenv/config'
import connectDB from "./db.js";

const app = express()
const PORT = process.env.PORT || 8080

// Connect to the database
connectDB();

import userRoutes from './routes/User_routes.js'; // Import user routes
import lotsRoutes from './routes/Lots_routes.js';

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

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}!`)
})