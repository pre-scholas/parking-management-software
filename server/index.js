import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'

const app = express
const PORT = process.env.PORT || 5050
const MONGODB_URI = process.env.ATLAS_URI


// Database connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('Connection error', err));


// Middleware
//----app.use(express.json());

// Basic route
// app.get("/", (req, res) => {
//     res.send("Used Bike Sales API.")
// })

// Routes
//---app.use('/api/bikes', bikeRoutes)

// start sever
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}!`)
})