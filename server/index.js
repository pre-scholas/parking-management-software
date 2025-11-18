import express from "express"
import 'dotenv/config'
import connectDB from "./db.js";

const app = express()
const PORT = process.env.PORT || 8080

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route to check if the server is running
app.get("/", (req, res) => {
    res.send("Parking Management API is running.")
})

// Example: User routes (you can create this file later)
// import userRoutes from './routes/userRoutes.js';
// app.use('/api/users', userRoutes);

// Routes
//---app.use('/api/bikes', bikeRoutes)

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}!`)
})