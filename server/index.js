import express from "express"
import 'dotenv/config'
import connectDB from "./db.js";

const app = express()
const PORT = process.env.PORT || 8080

// Connect to the database
connectDB();

import User from "./models/User_models.js";

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route to check if the server is running
app.get("/", (req, res) => {
    res.send("Parking Management API is running.")
})

// posting route > usersSchema to mongodb
app.post('/', async (req, res) => {
    // const character = await Character.insertOne({ name: 'Jean-Luc Picard' });
    // character.name; // 'Jean-Luc Picard'
   const result = await User.insertOne({
        username: "Jazmine",
        email: 'min@jazz.com',
        password: 'yaf',
    })
    res.send(result)
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